"use client";

import { useState, useEffect } from "react";
import { useAnonymousUserId } from "@/hooks/useAnonymousUserId";
import Rating from "@/components/rating";
import useSetRating from "../../hooks/useSetRating";
import useGetCurrentRating from "../../hooks/useGetCurrentRating";

interface ProductRatingProps {
  productId: string;
  initialRating: number; // Average rating from product
  initialReviewCount: number; // Review count from product
}

export default function ProductRating({
  productId,
  initialRating,
  initialReviewCount,
}: ProductRatingProps) {
  const anonymousUserId = useAnonymousUserId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState<number | null>(null); // User's vote (0-5), null if not voted
  const [currentAverageRating, setCurrentAverageRating] =
    useState(initialRating);
  const [currentReviewCount, setCurrentReviewCount] =
    useState(initialReviewCount);

  // Update when initial values change (from parent)
  useEffect(() => {
    setCurrentAverageRating(initialRating);
    setCurrentReviewCount(initialReviewCount);
  }, [initialRating, initialReviewCount]);

  // Fetch user's current rating
  const { data: myRating } = useGetCurrentRating(productId);

  // Update userVote when myRating is loaded
  useEffect(() => {
    if (myRating !== undefined && myRating !== null) {
      setUserVote(myRating);
    } else {
      setUserVote(null); // User hasn't voted
    }
  }, [myRating]);

  // Rating mutation
  const rateMutation = useSetRating();

  const handleStarClick = async (newRating: number) => {
    if (isSubmitting || !anonymousUserId) return;

    // Optimistically update UI
    setUserVote(newRating);
    setIsSubmitting(true);

    try {
      const response = await rateMutation.mutateAsync({
        productId,
        anonymousUserId,
        rating: newRating,
      });

      // Update with response data
      if (response) {
        setUserVote(response.userRating || newRating);
        setCurrentAverageRating(response.averageRating);
        setCurrentReviewCount(response.reviewCount);
      }
    } catch (error) {
      // Revert on error
      setUserVote(myRating || null);
      console.error("Failed to submit rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display user's vote if they voted, otherwise show 0 (empty stars)
  const displayRating = userVote ?? 0;

  // Format: "3.8 (123)" - show average rating and review count
  const ratingDisplay = `${currentAverageRating.toFixed(1)} (${currentReviewCount})`;

  return (
    <Rating
      rating={displayRating}
      onStarClick={handleStarClick}
      interactive={true}
      reviewCount={currentReviewCount}
      disabled={isSubmitting}
      ratingDisplay={ratingDisplay}
    />
  );
}

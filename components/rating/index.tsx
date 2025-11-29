"use client";

import { useState } from "react";

interface RatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  reviewCount?: number;
}

export default function Rating({
  rating: initialRating = 0,
  onRatingChange,
  interactive = false,
  reviewCount = 0,
}: RatingProps) {
  const [selectedRating, setSelectedRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Use controlled rating if provided, otherwise use internal state
  const displayRating = interactive
    ? hoveredRating || selectedRating
    : initialRating;

  const handleStarClick = (starIndex: number) => {
    if (!interactive) return;

    const newRating = starIndex + 1;
    setSelectedRating(newRating);
    console.log("Rating:", newRating);
    onRatingChange?.(newRating);
  };

  const handleStarHover = (starIndex: number) => {
    if (!interactive) return;
    setHoveredRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoveredRating(0);
  };

  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2" onMouseLeave={handleMouseLeave}>
      <div className="flex items-center gap-px">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= fullStars;
          const isHalfFilled = starValue === fullStars + 1 && hasHalfStar;
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleStarClick(i)}
              onMouseEnter={() => handleStarHover(i)}
              className={`transition-transform ${
                interactive
                  ? "cursor-pointer hover:scale-110 active:scale-95"
                  : "cursor-default"
              }`}
              disabled={!interactive}
              aria-label={`Rate ${starValue} out of 5`}
            >
              {isFilled ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="md:h-6 md:w-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 1L12.5 7.5L19.5 8.5L14.5 13L16 20L10 16.5L4 20L5.5 13L0.5 8.5L7.5 7.5L10 1Z"
                    fill="#FFBA00"
                  />
                </svg>
              ) : isHalfFilled ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="md:h-6 md:w-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`half-fill-${displayRating}-${i}`}>
                      <stop offset="50%" stopColor="#FFBA00" />
                      <stop
                        offset="50%"
                        stopColor="transparent"
                        stopOpacity="1"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M10 1L12.5 7.5L19.5 8.5L14.5 13L16 20L10 16.5L4 20L5.5 13L0.5 8.5L7.5 7.5L10 1Z"
                    fill={`url(#half-fill-${displayRating}-${i})`}
                  />
                  <path
                    d="M10 1L12.5 7.5L19.5 8.5L14.5 13L16 20L10 16.5L4 20L5.5 13L0.5 8.5L7.5 7.5L10 1Z"
                    fill="none"
                    stroke="#FFBA00"
                    strokeWidth="1"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="md:h-6 md:w-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 1L12.5 7.5L19.5 8.5L14.5 13L16 20L10 16.5L4 20L5.5 13L0.5 8.5L7.5 7.5L10 1Z"
                    fill="none"
                    stroke="#FFBA00"
                    strokeWidth="1"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      <span className="text-text-secondary text-sm md:text-base">
        {reviewCount}
      </span>
    </div>
  );
}

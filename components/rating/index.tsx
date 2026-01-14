"use client";

import { useState } from "react";

interface RatingProps {
  rating: number;
  onStarClick?: (starIndex: number) => void;
  onStarHover?: (starIndex: number) => void;
  onMouseLeave?: () => void;
  interactive?: boolean;
  reviewCount?: number;
  disabled?: boolean;
  ratingDisplay?: string; // Custom display text like "3.8 (123)"
}

export default function Rating({
  rating,
  onStarClick,
  onStarHover,
  onMouseLeave,
  interactive = false,
  reviewCount = 0,
  disabled = false,
  ratingDisplay,
}: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarHover = (starIndex: number) => {
    if (!interactive || disabled) return;
    setHoveredRating(starIndex + 1);
    onStarHover?.(starIndex);
  };

  const handleMouseLeave = () => {
    if (!interactive || disabled) return;
    setHoveredRating(0);
    onMouseLeave?.();
  };

  const handleStarClick = (starIndex: number) => {
    if (!interactive || disabled) return;
    onStarClick?.(starIndex + 1);
  };

  // Use hovered rating if hovering, otherwise use provided rating
  const displayRating = hoveredRating || rating;
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
                interactive && !disabled
                  ? "cursor-pointer hover:scale-110 active:scale-95"
                  : "cursor-default"
              } ${disabled ? "opacity-50" : ""}`}
              disabled={!interactive || disabled}
              aria-label={`Rate ${starValue} out of 5`}
              aria-disabled={disabled}
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
        {ratingDisplay || reviewCount}
      </span>
    </div>
  );
}

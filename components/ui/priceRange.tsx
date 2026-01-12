"use client";

import { useState, useCallback, useEffect } from "react";
import { Range } from "react-range";

interface PriceRangeProps {
  min?: number;
  max?: number;
  values?: [number, number];
  onChange?: (values: [number, number]) => void;
}

export default function PriceRange({
  min = 0,
  max = 20000,
  values: controlledValues,
  onChange,
}: PriceRangeProps) {
  const [mounted, setMounted] = useState(false);
  const [internalValues, setInternalValues] = useState<[number, number]>([
    min,
    max,
  ]);
  const [focusedInput, setFocusedInput] = useState<"min" | "max" | null>(null);
  const [inputValues, setInputValues] = useState<{ min: string; max: string }>({
    min: String(min),
    max: String(max),
  });

  const values = controlledValues || internalValues;

  // Ensure component only renders Range on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync input values when actual values change (e.g., from slider)
  // Only update when input is not focused to avoid interfering with user typing
  useEffect(() => {
    if (focusedInput === null) {
      setInputValues({
        min: String(values[0]),
        max: String(values[1]),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values[0], values[1], focusedInput]);

  const handleChange = useCallback(
    (newValues: number[]) => {
      const updatedValues: [number, number] = [newValues[0], newValues[1]];
      if (onChange) {
        onChange(updatedValues);
      } else {
        setInternalValues(updatedValues);
      }
    },
    [onChange]
  );

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow empty string for editing
    setInputValues((prev) => ({ ...prev, min: inputValue }));

    // Only update actual values if input is valid
    if (inputValue !== "" && !isNaN(Number(inputValue))) {
      const numValue = Number(inputValue);
      const newMin = Math.max(min, Math.min(numValue, values[1]));
      handleChange([newMin, values[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow empty string for editing
    setInputValues((prev) => ({ ...prev, max: inputValue }));

    // Only update actual values if input is valid
    if (inputValue !== "" && !isNaN(Number(inputValue))) {
      const numValue = Number(inputValue);
      const newMax = Math.min(max, Math.max(numValue, values[0]));
      handleChange([values[0], newMax]);
    }
  };

  const handleMinBlur = () => {
    const inputValue = inputValues.min.trim();
    if (inputValue === "" || isNaN(Number(inputValue))) {
      // Restore previous value if invalid
      setInputValues((prev) => ({ ...prev, min: String(values[0]) }));
    } else {
      // Validate and clamp value
      const numValue = Number(inputValue);
      const newMin = Math.max(min, Math.min(numValue, values[1]));
      handleChange([newMin, values[1]]);
    }
    setFocusedInput(null);
  };

  const handleMaxBlur = () => {
    const inputValue = inputValues.max.trim();
    if (inputValue === "" || isNaN(Number(inputValue))) {
      // Restore previous value if invalid
      setInputValues((prev) => ({ ...prev, max: String(values[1]) }));
    } else {
      // Validate and clamp value
      const numValue = Number(inputValue);
      const newMax = Math.min(max, Math.max(numValue, values[0]));
      handleChange([values[0], newMax]);
    }
    setFocusedInput(null);
  };

  const trackLeft = ((values[0] - min) / (max - min)) * 100;
  const trackWidth = ((values[1] - values[0]) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      {/* Slider */}
      <div className="px-2">
        {mounted ? (
          <Range
            step={1}
            min={min}
            max={max}
            values={values}
            onChange={handleChange}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="relative h-1 w-full rounded-full"
                style={{
                  ...props.style,
                }}
              >
                {/* Inactive track background */}
                <div className="absolute h-full w-full rounded-full bg-gray-200" />
                {/* Active track (yellow) */}
                <div
                  className="bg-primary absolute h-full rounded-full"
                  style={{
                    left: `${trackLeft}%`,
                    width: `${trackWidth}%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                className="bg-primary h-4 w-4 rounded-full shadow-md"
                style={{
                  ...props.style,
                  outline: "none",
                }}
              />
            )}
          />
        ) : (
          <div className="relative h-1 w-full rounded-full bg-gray-200">
            <div
              className="bg-primary absolute h-full rounded-full"
              style={{
                left: `${trackLeft}%`,
                width: `${trackWidth}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Input Fields */}
      <div className="flex items-center gap-6">
        <div className="border-line-color text-dark-secondary-100 relative flex h-8 flex-1 items-center justify-center rounded border text-xs">
          {focusedInput === "min" ? (
            <input
              type="text"
              value={inputValues.min}
              onChange={handleMinInputChange}
              onBlur={handleMinBlur}
              className="text-dark-secondary-100 w-full bg-transparent text-center text-xs focus:outline-none"
              autoFocus
            />
          ) : (
            <div
              onClick={() => {
                setFocusedInput("min");
                setInputValues((prev) => ({ ...prev, min: String(values[0]) }));
              }}
              className="text-dark-secondary-100 w-full cursor-text text-center text-xs"
            >
              {values[0]} GEL
            </div>
          )}
        </div>
        <div className="border-line-color text-dark-secondary-100 relative flex h-8 flex-1 items-center justify-center rounded border text-xs">
          {focusedInput === "max" ? (
            <input
              type="text"
              value={inputValues.max}
              onChange={handleMaxInputChange}
              onBlur={handleMaxBlur}
              className="text-dark-secondary-100 w-full bg-transparent text-center text-xs focus:outline-none"
              autoFocus
            />
          ) : (
            <div
              onClick={() => {
                setFocusedInput("max");
                setInputValues((prev) => ({ ...prev, max: String(values[1]) }));
              }}
              className="text-dark-secondary-100 w-full cursor-text text-center text-xs"
            >
              {values[1]} GEL
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

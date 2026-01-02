"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class BannerCarouselErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("BannerCarousel error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="relative mt-16 aspect-39/40 w-full overflow-hidden md:mt-0 md:aspect-3/1 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 text-sm">
              Failed to load banner carousel
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}


"use client";

import { Component, ReactNode } from "react";
import { useTranslations } from "next-intl";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class NewsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // In production, log to error monitoring service
    if (process.env.NODE_ENV === "development") {
      console.error("News error boundary caught error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || <NewsErrorFallback error={this.state.error} />
      );
    }

    return this.props.children;
  }
}

function NewsErrorFallback({ error }: { error?: Error }) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-dark-secondary-100 text-xl font-bold">
          {t("news.error.title")}
        </h2>
        <p className="text-text-secondary text-sm">
          {error?.message || t("news.error.message")}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          {t("news.error.retry")}
        </button>
      </div>
    </div>
  );
}


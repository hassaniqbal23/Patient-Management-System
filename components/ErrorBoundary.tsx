// components/ErrorBoundary.tsx
"use client";

import React from "react";
import * as Sentry from "@sentry/nextjs";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error: Error | null }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          {process.env.NODE_ENV === "development" && (
            <pre className="bg-gray-100 p-4 rounded mb-4">
              {this.state.error?.message}
            </pre>
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

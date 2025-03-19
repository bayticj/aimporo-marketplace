'use client';

import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GigsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        <svg
          className="h-24 w-24 text-orange-500 mx-auto mb-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Gig</h1>
        <p className="text-gray-600 mb-8">
          {error.message || "We couldn't load the gig you're looking for. It might be unavailable or there might be a network issue."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/gigs"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Gigs
          </Link>
        </div>
      </div>
    </div>
  );
} 
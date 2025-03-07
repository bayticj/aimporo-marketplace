'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SoftwareError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Software page error:', error);
  }, [error]);

  // Check if the error is related to API connectivity
  const isApiError = error.message.includes('Failed to fetch') || 
                     error.message.includes('Network error') ||
                     error.message.includes('Unable to connect');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Software Page Error</h1>
        <p className="text-gray-600 mb-4">
          {error.message || 'An error occurred while loading the software page. Please try again later.'}
        </p>
        
        {isApiError && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-yellow-800 mb-2">Connection Issues</h3>
            <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
              <li>Check your internet connection</li>
              <li>The API server might be down or unreachable</li>
              <li>Firewall or network settings might be blocking the connection</li>
              <li>Try refreshing the page or coming back later</li>
            </ul>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
} 
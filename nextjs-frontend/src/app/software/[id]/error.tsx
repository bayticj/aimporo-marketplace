'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function SoftwareError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Software product page error:', error);
  }, [error]);

  return (
    <div className="content bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto text-center">
          <div className="text-orange-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">
            There was an error loading this software product. Please try again later.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={reset}
              className="btn bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Try again
            </button>
            <Link href="/software" className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              Back to Software Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
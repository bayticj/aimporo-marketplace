import React from 'react';

export default function SoftwareLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-r-4 border-orange-300 border-b-4 border-orange-500 border-l-4 border-orange-300 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Software Products...</h2>
        <p className="text-gray-500 mt-2">Please wait while we fetch the latest software products.</p>
      </div>
    </div>
  );
} 
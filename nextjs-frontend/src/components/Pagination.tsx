import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate pagination range
  const getPaginationRange = (current: number, total: number): (number | string)[] => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    if (current <= 3) {
      return [1, 2, 3, 4, '...', total];
    }
    
    if (current >= total - 2) {
      return [1, '...', total - 3, total - 2, total - 1, total];
    }
    
    return [1, '...', current - 1, current, current + 1, '...', total];
  };
  
  const range = getPaginationRange(currentPage, totalPages);
  
  return (
    <div className="flex justify-center">
      <nav className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
          }`}
        >
          <span className="sr-only">Previous</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        {/* Page Numbers */}
        {range.map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === 'number' ? (
              <button
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === page
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                }`}
              >
                {page}
              </button>
            ) : (
              <span className="px-4 py-2 text-gray-500">...</span>
            )}
          </React.Fragment>
        ))}
        
        {/* Next Button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
          }`}
        >
          <span className="sr-only">Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination; 
'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CategoryDropdownProps {
  onSelectCategories?: (categories: string[]) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onSelectCategories }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Category data
  const categories = [
    { id: 'programming', name: 'Programming & Coding' },
    { id: 'data_science', name: 'Data Science & Analysis' },
    { id: 'databases', name: 'Databases' },
    { id: 'mobile_app', name: 'Mobile App Development' },
    { id: 'email_template', name: 'Email Template Development' },
    { id: 'cms', name: 'CMS Development' },
    { id: 'web_development', name: 'Web Development' },
    { id: 'ui_ux', name: 'UI/UX Design' },
    { id: 'graphic_design', name: 'Graphic Design' },
    { id: 'digital_marketing', name: 'Digital Marketing' },
    { id: 'seo', name: 'SEO Optimization' },
    { id: 'content_writing', name: 'Content Writing' },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle category selection
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
      
      if (onSelectCategories) {
        onSelectCategories(newSelection);
      }
      
      return newSelection;
    });
  };

  // Reset category selection
  const resetCategories = () => {
    setSelectedCategories([]);
    setSearchTerm('');
    if (onSelectCategories) {
      onSelectCategories([]);
    }
  };

  // Apply category filter
  const applyCategories = () => {
    setShowDropdown(false);
    if (onSelectCategories) {
      onSelectCategories(selectedCategories);
    }
  };

  // Filter categories by search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span>Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {showDropdown && (
        <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 border">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Search Category"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            <div className="space-y-2">
              {filteredCategories.map(category => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-4 w-4 text-orange-500" 
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <span className="text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
            {categories.length > filteredCategories.length && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <button 
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  onClick={() => setSearchTerm('')}
                >
                  Show All Categories
                </button>
              </div>
            )}
            {filteredCategories.length === 0 && (
              <div className="py-2 text-center text-gray-500">
                No categories found
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
            <button 
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              onClick={resetCategories}
            >
              Reset
            </button>
            <button 
              className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-orange-600"
              onClick={applyCategories}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown; 
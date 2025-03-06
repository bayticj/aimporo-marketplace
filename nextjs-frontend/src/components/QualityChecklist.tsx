import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  required: boolean;
}

interface ChecklistCategory {
  id: string;
  name: string;
  items: ChecklistItem[];
}

interface QualityChecklistProps {
  categories: ChecklistCategory[];
  onSave: (categories: ChecklistCategory[]) => Promise<void>;
  onComplete: (isComplete: boolean) => void;
  readOnly?: boolean;
}

const QualityChecklist: React.FC<QualityChecklistProps> = ({
  categories: initialCategories,
  onSave,
  onComplete,
  readOnly = false,
}) => {
  const [categories, setCategories] = useState<ChecklistCategory[]>(initialCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Calculate if all required items are checked
  const allRequiredChecked = categories.every(category => 
    category.items.every(item => !item.required || item.checked)
  );
  
  // Calculate overall completion percentage
  const totalItems = categories.reduce((total, category) => total + category.items.length, 0);
  const checkedItems = categories.reduce((total, category) => 
    total + category.items.filter(item => item.checked).length, 0
  );
  const completionPercentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
  
  const handleItemCheck = (categoryId: string, itemId: string, checked: boolean) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => 
            item.id === itemId ? { ...item, checked } : item
          )
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    
    // Notify parent component about completion status
    const updatedAllRequiredChecked = updatedCategories.every(category => 
      category.items.every(item => !item.required || item.checked)
    );
    onComplete(updatedAllRequiredChecked);
  };
  
  const handleSaveChecklist = async () => {
    setIsSubmitting(true);
    try {
      await onSave(categories);
      toast.success('Quality checklist saved successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving quality checklist:', error);
      toast.error('Failed to save quality checklist');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (readOnly) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quality Checklist</h2>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Completion</span>
            <span className="text-sm font-medium text-gray-700">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${allRequiredChecked ? 'bg-green-600' : 'bg-blue-600'}`} 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {categories.map(category => (
          <div key={category.id} className="mb-6">
            <h3 className="text-lg font-medium mb-3">{category.name}</h3>
            <ul className="space-y-2">
              {category.items.map(item => (
                <li key={item.id} className="flex items-center">
                  <div className={`h-4 w-4 rounded border ${item.checked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'} mr-3`}>
                    {item.checked && (
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`${item.checked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {item.label}
                    {item.required && <span className="text-red-500 ml-1">*</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quality Checklist</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            Edit Checklist
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Completion</span>
          <span className="text-sm font-medium text-gray-700">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${allRequiredChecked ? 'bg-green-600' : 'bg-blue-600'}`} 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {categories.map(category => (
        <div key={category.id} className="mb-6">
          <h3 className="text-lg font-medium mb-3">{category.name}</h3>
          <ul className="space-y-2">
            {category.items.map(item => (
              <li key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`item-${item.id}`}
                  checked={item.checked}
                  onChange={(e) => handleItemCheck(category.id, item.id, e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-3"
                  disabled={isEditing}
                />
                <label htmlFor={`item-${item.id}`} className="text-gray-700">
                  {item.label}
                  {item.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {isEditing && (
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChecklist}
            disabled={isSubmitting}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Checklist'}
          </button>
        </div>
      )}
      
      {!allRequiredChecked && !isEditing && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800 mt-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Please complete all required items marked with an asterisk (*)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualityChecklist; 
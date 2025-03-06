import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Criterion {
  id: string;
  description: string;
}

interface AcceptanceCriteriaProps {
  orderId: number;
  initialCriteria?: Criterion[];
  onSave: (criteria: Criterion[]) => Promise<void>;
  readOnly?: boolean;
}

const AcceptanceCriteria: React.FC<AcceptanceCriteriaProps> = ({
  orderId,
  initialCriteria = [],
  onSave,
  readOnly = false,
}) => {
  const [criteria, setCriteria] = useState<Criterion[]>(initialCriteria);
  const [newCriterion, setNewCriterion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddCriterion = () => {
    if (!newCriterion.trim()) {
      toast.error('Please enter a criterion description');
      return;
    }

    const newItem: Criterion = {
      id: `criterion-${Date.now()}`,
      description: newCriterion.trim(),
    };

    setCriteria([...criteria, newItem]);
    setNewCriterion('');
  };

  const handleRemoveCriterion = (id: string) => {
    setCriteria(criteria.filter(item => item.id !== id));
  };

  const handleSaveCriteria = async () => {
    setIsSubmitting(true);
    try {
      await onSave(criteria);
      toast.success('Acceptance criteria saved successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving acceptance criteria:', error);
      toast.error('Failed to save acceptance criteria');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (readOnly) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Acceptance Criteria</h2>
        {criteria.length === 0 ? (
          <p className="text-gray-500 italic">No acceptance criteria defined</p>
        ) : (
          <ul className="space-y-2">
            {criteria.map(criterion => (
              <li key={criterion.id} className="flex items-start">
                <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{criterion.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Acceptance Criteria</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            Edit Criteria
          </button>
        )}
      </div>

      {isEditing ? (
        <>
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newCriterion}
                onChange={(e) => setNewCriterion(e.target.value)}
                placeholder="Enter a new acceptance criterion"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={handleAddCriterion}
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </div>

          <ul className="space-y-2 mb-6">
            {criteria.map(criterion => (
              <li key={criterion.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span>{criterion.description}</span>
                <button
                  onClick={() => handleRemoveCriterion(criterion.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCriteria}
              disabled={isSubmitting}
              className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save Criteria'}
            </button>
          </div>
        </>
      ) : (
        <>
          {criteria.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">No acceptance criteria defined yet</p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Define Criteria
              </button>
            </div>
          ) : (
            <ul className="space-y-2">
              {criteria.map(criterion => (
                <li key={criterion.id} className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{criterion.description}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default AcceptanceCriteria; 
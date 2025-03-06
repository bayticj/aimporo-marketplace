'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface RoleSwitcherProps {
  onRoleSwitch?: (role: string) => void;
}

/**
 * A component that allows users with multiple roles to switch between them
 * 
 * @param onRoleSwitch - Optional callback function that is called when a role is switched
 */
const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ onRoleSwitch }) => {
  const { user, activeRole: contextActiveRole, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // If user has only one role or no roles, don't render the switcher
  if (!user || !user.roles || user.roles.length <= 1) {
    return null;
  }

  const handleRoleSwitch = (role: string) => {
    setIsOpen(false);
    
    // Call the switchRole function from AuthContext
    switchRole(role);
    
    // Call the callback if provided
    if (onRoleSwitch) {
      onRoleSwitch(role);
    }
  };

  // Get role display name (capitalize first letter)
  const getRoleDisplayName = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'seller':
        return 'bg-blue-100 text-blue-800';
      case 'buyer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(contextActiveRole || '')}`}>
          {getRoleDisplayName(contextActiveRole || '')}
        </span>
        <span className="text-sm text-gray-600">View as</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            {user.roles.map(role => (
              <button
                key={role}
                onClick={() => handleRoleSwitch(role)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${
                  contextActiveRole === role ? 'bg-gray-50' : ''
                }`}
              >
                <span>{getRoleDisplayName(role)}</span>
                {contextActiveRole === role && (
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher; 
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { roleService } from '@/services/api';
import { mockRoleService } from '@/services/mockAuth';
import RoleBasedAccess from '@/components/auth/RoleBasedAccess';

// Use mock service for development
const api = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' ? mockRoleService : roleService;

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

interface Role {
  id: number;
  name: string;
}

// Mock user data for development
const mockUsers: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', roles: ['admin'] },
  { id: 2, name: 'Seller User', email: 'seller@example.com', roles: ['seller'] },
  { id: 3, name: 'Buyer User', email: 'buyer@example.com', roles: ['buyer'] },
  { id: 4, name: 'Multi-Role User', email: 'both@example.com', roles: ['buyer', 'seller'] },
];

export default function UserManagementPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const response = await api.getRoles();
        setRoles(response.data.roles);
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to load roles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleOpenModal = (user: User) => {
    setCurrentUser(user);
    setSelectedRoles([...user.roles]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setSelectedRoles([]);
  };

  const handleRoleChange = (roleName: string) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleName)) {
        return prev.filter(r => r !== roleName);
      } else {
        return [...prev, roleName];
      }
    });
  };

  const handleSaveRoles = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Determine roles to add and remove
      const rolesToAdd = selectedRoles.filter(role => !currentUser.roles.includes(role));
      const rolesToRemove = currentUser.roles.filter(role => !selectedRoles.includes(role));
      
      // Process role changes
      for (const role of rolesToAdd) {
        await api.assignRole(currentUser.id, role);
      }
      
      for (const role of rolesToRemove) {
        await api.removeRole(currentUser.id, role);
      }
      
      // Update user in the list
      setUsers(prev => 
        prev.map(u => 
          u.id === currentUser.id ? { ...u, roles: selectedRoles } : u
        )
      );
      
      handleCloseModal();
    } catch (err: any) {
      console.error('Error updating user roles:', err);
      setError(err.message || 'Failed to update user roles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleBasedAccess allowedRoles={['admin']} fallback={<div>Access denied. Admin privileges required.</div>}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && roles.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map(role => (
                          <span 
                            key={role}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Manage Roles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Role Assignment Modal */}
        {isModalOpen && currentUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">
                Manage Roles: {currentUser.name}
              </h2>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Select the roles for this user:
                </p>
                
                <div className="space-y-2">
                  {roles.map(role => (
                    <div key={role.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`role-${role.id}`}
                        checked={selectedRoles.includes(role.name)}
                        onChange={() => handleRoleChange(role.name)}
                        className="mr-2"
                      />
                      <label htmlFor={`role-${role.id}`} className="text-sm">
                        {role.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveRoles}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleBasedAccess>
  );
} 
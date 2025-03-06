'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { roleService } from '@/services/api';
import { mockRoleService } from '@/services/mockAuth';
import RoleBasedAccess from '@/components/auth/RoleBasedAccess';
import { useRouter } from 'next/navigation';

// Use mock service for development
const api = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' ? mockRoleService : roleService;

interface Permission {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export default function RolesManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as number[]
  });

  // Fetch roles and permissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rolesResponse, permissionsResponse] = await Promise.all([
          api.getRoles(),
          api.getPermissions()
        ]);
        setRoles(rolesResponse.data.roles);
        setPermissions(permissionsResponse.data.permissions);
      } catch (err) {
        console.error('Error fetching roles data:', err);
        setError('Failed to load roles data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (role?: Role) => {
    if (role) {
      // Edit mode
      setIsEditMode(true);
      setCurrentRole(role);
      setFormData({
        name: role.name,
        permissions: role.permissions.map(p => p.id)
      });
    } else {
      // Create mode
      setIsEditMode(false);
      setCurrentRole(null);
      setFormData({
        name: '',
        permissions: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      permissions: []
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permissionId: number) => {
    setFormData(prev => {
      const permissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId];
      
      return {
        ...prev,
        permissions
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (isEditMode && currentRole) {
        // Update existing role
        const response = await api.updateRole(currentRole.id, formData);
        
        // Update roles list
        setRoles(prev => 
          prev.map(role => 
            role.id === currentRole.id ? response.data.role : role
          )
        );
      } else {
        // Create new role
        const response = await api.createRole(formData);
        
        // Add new role to list
        setRoles(prev => [...prev, response.data.role]);
      }
      
      // Close modal and reset form
      handleCloseModal();
    } catch (err: any) {
      console.error('Error saving role:', err);
      setError(err.message || 'Failed to save role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (!window.confirm('Are you sure you want to delete this role?')) {
      return;
    }
    
    try {
      setLoading(true);
      await api.deleteRole(roleId);
      
      // Remove role from list
      setRoles(prev => prev.filter(role => role.id !== roleId));
    } catch (err: any) {
      console.error('Error deleting role:', err);
      setError(err.message || 'Failed to delete role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Group permissions by category for better organization
  const groupedPermissions = permissions.reduce((groups, permission) => {
    const category = permission.name.split(' ')[0]; // Use first word as category
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {} as Record<string, Permission[]>);

  return (
    <RoleBasedAccess allowedRoles={['admin']} fallback={<div>Access denied. Admin privileges required.</div>}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Role Management</h1>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Role
          </button>
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
                    Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map(role => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{role.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 5).map(permission => (
                          <span 
                            key={permission.id}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                          >
                            {permission.name}
                          </span>
                        ))}
                        {role.permissions.length > 5 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            +{role.permissions.length - 5} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(role)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className={`text-red-600 hover:text-red-900 ${['admin', 'seller', 'buyer'].includes(role.name) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={['admin', 'seller', 'buyer'].includes(role.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Role Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {isEditMode ? `Edit Role: ${currentRole?.name}` : 'Create New Role'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Role Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter role name"
                    required
                    disabled={isEditMode && ['admin', 'seller', 'buyer'].includes(currentRole?.name || '')}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Permissions
                  </label>
                  
                  {Object.entries(groupedPermissions).map(([category, perms]) => (
                    <div key={category} className="mb-4">
                      <h3 className="text-md font-semibold mb-2 capitalize">{category}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {perms.map(permission => (
                          <div key={permission.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`permission-${permission.id}`}
                              checked={formData.permissions.includes(permission.id)}
                              onChange={() => handlePermissionChange(permission.id)}
                              className="mr-2"
                            />
                            <label htmlFor={`permission-${permission.id}`} className="text-sm">
                              {permission.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </RoleBasedAccess>
  );
} 
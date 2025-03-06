// Mock authentication service for development

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// Mock permissions for different roles
const mockPermissions = {
  admin: [
    'create gigs', 'edit gigs', 'delete gigs', 'view gigs',
    'create orders', 'manage orders', 'view orders',
    'submit deliverables', 'review deliverables',
    'manage users', 'view users',
    'process payments', 'view transactions'
  ],
  seller: [
    'create gigs', 'edit gigs', 'delete gigs', 'view gigs',
    'manage orders', 'view orders',
    'submit deliverables', 'view transactions'
  ],
  buyer: [
    'view gigs', 'create orders', 'view orders',
    'review deliverables', 'view transactions'
  ]
};

// Mock user data
const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  roles: ['seller'],
  permissions: mockPermissions.seller
};

// Mock role data
const mockRoles = [
  {
    id: 1,
    name: 'admin',
    permissions: mockPermissions.admin.map((name, id) => ({ id: id + 1, name }))
  },
  {
    id: 2,
    name: 'seller',
    permissions: mockPermissions.seller.map((name, id) => ({ id: id + 1, name }))
  },
  {
    id: 3,
    name: 'buyer',
    permissions: mockPermissions.buyer.map((name, id) => ({ id: id + 1, name }))
  }
];

// Mock permissions data
const mockPermissionsList = [
  ...new Set([
    ...mockPermissions.admin,
    ...mockPermissions.seller,
    ...mockPermissions.buyer
  ])
].map((name, id) => ({ id: id + 1, name }));

export const mockAuthService = {
  register: async (userData: any): Promise<{ data: RegisterResponse }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Determine roles and permissions based on account_type
    let roles: string[] = [];
    let permissions: string[] = [];
    
    if (userData.account_type === 'buyer') {
      roles = ['buyer'];
      permissions = mockPermissions.buyer;
    } else if (userData.account_type === 'seller') {
      roles = ['seller'];
      permissions = mockPermissions.seller;
    } else if (userData.account_type === 'both') {
      roles = ['buyer', 'seller'];
      permissions = [...new Set([...mockPermissions.buyer, ...mockPermissions.seller])];
    }
    
    // Simulate successful registration
    return {
      data: {
        access_token: 'mock-jwt-token',
        refresh_token: 'mock-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        user: {
          id: 1,
          name: userData.name,
          email: userData.email,
          roles,
          permissions
        }
      }
    };
  },
  
  login: async (credentials: any): Promise<{ data: LoginResponse }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For testing different roles
    let roles: string[] = ['seller'];
    let permissions = mockPermissions.seller;
    
    // Special test accounts for different roles
    if (credentials.email === 'admin@example.com') {
      roles = ['admin'];
      permissions = mockPermissions.admin;
    } else if (credentials.email === 'buyer@example.com') {
      roles = ['buyer'];
      permissions = mockPermissions.buyer;
    } else if (credentials.email === 'both@example.com') {
      roles = ['buyer', 'seller'];
      permissions = [...new Set([...mockPermissions.buyer, ...mockPermissions.seller])];
    }
    
    // Accept any credentials for testing purposes
    return {
      data: {
        access_token: 'mock-jwt-token',
        refresh_token: 'mock-refresh-token',
        token_type: 'Bearer',
        expires_in: 3600,
        user: {
          ...mockUser,
          email: credentials.email || mockUser.email,
          roles,
          permissions
        }
      }
    };
  },
  
  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return;
  },
  
  getUser: async (): Promise<{ data: { user: User } }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock user data
    return {
      data: {
        user: mockUser
      }
    };
  }
};

export const mockRoleService = {
  getRoles: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { roles: mockRoles } };
  },
  
  getRole: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const role = mockRoles.find(role => role.id === id);
    return { data: { role } };
  },
  
  createRole: async (roleData: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newRole = {
      id: mockRoles.length + 1,
      name: roleData.name,
      permissions: roleData.permissions ? 
        mockPermissionsList.filter(p => roleData.permissions.includes(p.id)) : []
    };
    return { data: { message: 'Role created successfully', role: newRole } };
  },
  
  updateRole: async (id: number, roleData: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const role = mockRoles.find(role => role.id === id);
    if (!role) {
      throw new Error('Role not found');
    }
    
    const updatedRole = {
      ...role,
      name: roleData.name || role.name,
      permissions: roleData.permissions ? 
        mockPermissionsList.filter(p => roleData.permissions.includes(p.id)) : role.permissions
    };
    
    return { data: { message: 'Role updated successfully', role: updatedRole } };
  },
  
  deleteRole: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Check if it's a system role
    const role = mockRoles.find(role => role.id === id);
    if (!role) {
      throw new Error('Role not found');
    }
    
    if (['admin', 'seller', 'buyer'].includes(role.name)) {
      throw new Error('Cannot delete system roles');
    }
    
    return { data: { message: 'Role deleted successfully' } };
  },
  
  getPermissions: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { permissions: mockPermissionsList } };
  },
  
  assignRole: async (userId: number, role: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { 
      data: { 
        message: 'Role assigned successfully',
        user: {
          ...mockUser,
          roles: [...mockUser.roles, role]
        }
      } 
    };
  },
  
  removeRole: async (userId: number, role: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { 
      data: { 
        message: 'Role removed successfully',
        user: {
          ...mockUser,
          roles: mockUser.roles.filter(r => r !== role)
        }
      } 
    };
  }
}; 
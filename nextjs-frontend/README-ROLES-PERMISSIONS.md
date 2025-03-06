# Role and Permission System

This document outlines the role and permission system implemented in the marketplace application.

## Overview

The marketplace uses a role-based access control (RBAC) system to manage user permissions. Each user can have one or more roles, and each role has a set of permissions. This allows for fine-grained control over what actions users can perform in the application.

## Roles

The system includes the following default roles:

1. **Admin**: Full access to all features and functionality
2. **Seller**: Can create and manage gigs, fulfill orders, and view earnings
3. **Buyer**: Can browse gigs, place orders, and provide feedback

Users can have multiple roles (e.g., a user can be both a buyer and a seller).

## Permissions

Permissions are granular capabilities that define what actions a user can perform. They are grouped by category:

### Gig Permissions
- `create gigs`: Ability to create new gigs
- `edit gigs`: Ability to edit existing gigs
- `delete gigs`: Ability to delete gigs
- `view gigs`: Ability to view gigs

### Order Permissions
- `create orders`: Ability to place orders
- `manage orders`: Ability to update order status and details
- `view orders`: Ability to view orders

### Deliverable Permissions
- `submit deliverables`: Ability to submit work for orders
- `review deliverables`: Ability to review and provide feedback on deliverables

### User Permissions
- `manage users`: Ability to manage user accounts
- `view users`: Ability to view user information

### Payment Permissions
- `process payments`: Ability to process payments
- `view transactions`: Ability to view transaction history

## Role Management

Administrators can manage roles and permissions through the admin interface:

1. **View Roles**: See all available roles and their permissions
2. **Create Roles**: Create new custom roles with specific permissions
3. **Edit Roles**: Modify existing roles and their permissions
4. **Delete Roles**: Remove custom roles (system roles cannot be deleted)

## User Role Assignment

Administrators can assign roles to users:

1. **View User Roles**: See all users and their assigned roles
2. **Assign Roles**: Add roles to users
3. **Remove Roles**: Remove roles from users (users must have at least one role)

## Role Switching

Users with multiple roles can switch between them using the role switcher component:

1. **View Current Role**: See the currently active role
2. **Switch Roles**: Change the active role to access different functionality
3. **Role-Specific Views**: UI adapts based on the active role

## Implementation Details

### Frontend

- **RoleBasedAccess Component**: Conditionally renders content based on user roles and permissions
- **RoleSwitcher Component**: Allows users to switch between roles
- **AuthContext**: Provides role and permission checking functionality
- **Middleware**: Protects routes based on roles and permissions

### Backend

- **Spatie Laravel Permission**: Uses the Spatie package for role and permission management
- **Role Controller**: API endpoints for managing roles and permissions
- **Middleware**: Protects API endpoints based on roles and permissions

## Testing

To test the role and permission system:

1. **Login as Different Users**:
   - Admin: admin@example.com
   - Seller: seller@example.com
   - Buyer: buyer@example.com
   - Multi-role: both@example.com

2. **Test Role Switching**:
   - Login as a multi-role user
   - Use the role switcher to change roles
   - Verify that the UI adapts accordingly

3. **Test Permission Checks**:
   - Verify that users can only access features they have permission for
   - Test edge cases like removing all roles from a user

## Security Considerations

- Role and permission checks are performed on both the frontend and backend
- API endpoints are protected with middleware
- System roles (admin, seller, buyer) cannot be deleted
- Users must have at least one role 
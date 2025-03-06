'use client';

import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';

interface RoleBasedAccessProps {
  children: ReactNode;
  allowedRoles?: string[];
  allowedPermissions?: string[];
  fallback?: ReactNode;
  checkActiveRoleOnly?: boolean;
}

/**
 * A component that conditionally renders its children based on user roles and permissions
 * 
 * @param children - The content to render if the user has the required roles/permissions
 * @param allowedRoles - Optional array of roles that are allowed to access the content
 * @param allowedPermissions - Optional array of permissions that are allowed to access the content
 * @param fallback - Optional content to render if the user doesn't have the required roles/permissions
 * @param checkActiveRoleOnly - If true, only checks the active role instead of all user roles
 */
const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({
  children,
  allowedRoles,
  allowedPermissions,
  fallback = null,
  checkActiveRoleOnly = false,
}) => {
  const { user, hasRole, hasPermission, activeRole } = useAuth();

  // If no user is logged in, show fallback
  if (!user) {
    return <>{fallback}</>;
  }

  // If no roles or permissions are specified, render the children
  if (!allowedRoles && !allowedPermissions) {
    return <>{children}</>;
  }

  // Check if user has any of the allowed roles
  let hasAllowedRole = false;
  
  if (checkActiveRoleOnly && activeRole) {
    // Only check if the active role is in the allowed roles
    hasAllowedRole = allowedRoles ? allowedRoles.includes(activeRole) : false;
  } else {
    // Check if user has any of the allowed roles
    hasAllowedRole = allowedRoles ? hasRole(allowedRoles) : false;
  }

  // Check if user has any of the allowed permissions
  const hasAllowedPermission = allowedPermissions ? hasPermission(allowedPermissions) : false;

  // If roles and permissions are both specified, user must have at least one of each
  if (allowedRoles && allowedPermissions) {
    return (hasAllowedRole && hasAllowedPermission) ? <>{children}</> : <>{fallback}</>;
  }

  // If only roles are specified, check roles
  if (allowedRoles) {
    return hasAllowedRole ? <>{children}</> : <>{fallback}</>;
  }

  // If only permissions are specified, check permissions
  return hasAllowedPermission ? <>{children}</> : <>{fallback}</>;
};

export default RoleBasedAccess; 
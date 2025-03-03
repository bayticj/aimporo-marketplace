'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';
import './auth.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Add a class to the body to hide the footer on auth pages
    document.body.classList.add('auth-page');
    
    // Cleanup function to remove the class when navigating away
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  return (
    <div className="auth-layout">
      {children}
      <Script
        src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"
        onLoad={() => {
          // @ts-ignore
          if (typeof feather !== 'undefined') {
            // @ts-ignore
            feather.replace();
          }
        }}
      />
    </div>
  );
} 
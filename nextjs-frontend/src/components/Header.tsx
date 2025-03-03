import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <Link href="/" className="navbar-brand logo">
              <img 
                src="/assets/img/aimporo-logo.png" 
                alt="Aimporo Logo" 
                className="img-fluid"
                style={{ 
                  maxHeight: '40px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </Link>
          </div>
          
          <div className="main-menu-wrapper">
            <ul className="main-nav">
              <li className="nav-item">
                <Link href="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/services" className="nav-link">Services</Link>
              </li>
              <li className="nav-item">
                <Link href="/api-test" className="nav-link">API Test</Link>
              </li>
            </ul>
          </div>
          
          <ul className="nav header-navbar-rht">
            <li className="nav-item">
              <Link 
                href="/auth/signin" 
                className="btn btn-secondary"
                style={{ 
                  padding: '10px 25px',
                  borderRadius: '8px',
                  fontWeight: '500',
                  minWidth: '120px',
                  textAlign: 'center'
                }}
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/auth/signup" 
                className="btn btn-primary"
                style={{ 
                  padding: '10px 25px',
                  borderRadius: '8px',
                  fontWeight: '500',
                  minWidth: '120px',
                  textAlign: 'center'
                }}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
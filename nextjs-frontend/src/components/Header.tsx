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
            </ul>
          </div>
          
          <ul className="nav header-navbar-rht">
            <li className="nav-item">
              <Link href="/signin" className="btn btn-secondary">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link href="/signup" className="btn btn-primary">Get Started</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
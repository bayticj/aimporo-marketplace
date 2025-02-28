import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo-container">
        <img 
          src="/assets/img/aimporo-logo.png" 
          alt="Aimporo Logo" 
          className="logo"
          height="40"
        />
      </div>
    </header>
  );
};

export default Header; 
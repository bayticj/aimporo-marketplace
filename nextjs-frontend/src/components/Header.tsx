import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="logo-container">
          <Link href="/">
            <div className="flex items-center">
              <Image 
                src="/assets/img/aimporo-logo.png" 
                alt="Aimporo Logo" 
                width={160}
                height={40}
                className="logo"
              />
            </div>
          </Link>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li><Link href="/gigs" className="hover:text-blue-600 transition-colors">Gigs</Link></li>
            <li><Link href="/digital-products" className="hover:text-blue-600 transition-colors">Digital Products</Link></li>
            <li><Link href="/software" className="hover:text-blue-600 transition-colors">Software</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons flex gap-3">
          <Link href="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 
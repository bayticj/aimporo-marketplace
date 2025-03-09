'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  useEffect(() => {
    // Initialize AOS animations if available
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  return (
    <footer className="footer-gradient text-white relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#FF6900] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FF6900] rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="col-span-1 md:col-span-1 footer-fade-in footer-stagger-delay-1">
            <Link href="/">
              <div className="flex items-center mb-6">
                <Image 
                  src="/assets/img/aimporo-logo.png" 
                  alt="AIMporo Marketplace Logo" 
                  width={200}
                  height={50}
                  className="logo hover:opacity-90 transition-opacity"
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Our mission is to lead the way in digital transformation
              and automation. We aim to enabling them to navigate
              the evolving digital landscape with confidence.
            </p>
            <div className="flex space-x-4 mb-8">
              <Link href="#" aria-label="Facebook" className="social-icon bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-all">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" aria-label="Twitter" className="social-icon bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-all">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="#" aria-label="Instagram" className="social-icon bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-all">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="#" aria-label="Google" className="social-icon bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-all">
                <i className="fab fa-google"></i>
              </Link>
              <Link href="#" aria-label="YouTube" className="social-icon bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-all">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>

          {/* Our Company */}
          <div className="col-span-1 footer-fade-in footer-stagger-delay-2">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Our Company
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#FF6900]"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors footer-link">About Us</Link>
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">Categories</Link>
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/create-gigs" className="text-gray-300 hover:text-white transition-colors footer-link">Create Gigs</Link>
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors footer-link">Pricing</Link>
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors footer-link">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Dashboard */}
          <div className="col-span-1 footer-fade-in footer-stagger-delay-3">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Dashboard
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#FF6900]"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/user/purchase" className="text-gray-300 hover:text-white transition-colors footer-link">Purchase</Link>
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/user/sales" className="text-gray-300 hover:text-white transition-colors footer-link">Sales</Link>
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/user/payment" className="text-gray-300 hover:text-white transition-colors footer-link">Payments</Link>
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/user/files" className="text-gray-300 hover:text-white transition-colors footer-link">Files</Link>
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6900] mr-2">•</span>
                <Link href="/user/wishlist" className="text-gray-300 hover:text-white transition-colors footer-link">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Featured Categories */}
          <div className="col-span-1 footer-fade-in footer-stagger-delay-4">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Featured Categories
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#FF6900]"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">Programming &amp; Tech</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">Music &amp; Audio</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">Lifestyle</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">Photography</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">Business</Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">eBook Publishing</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">AI Artists</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">AI Services</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">Data</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#FF6900] mr-2">•</span>
                    <Link href="/categories" className="text-gray-300 hover:text-white transition-colors footer-link">Consulting</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 pt-10 border-t footer-border-gradient">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center footer-fade-in footer-stagger-delay-1 group">
              <div className="mr-4 text-white bg-gray-800 p-3 rounded-lg footer-pulse">
                <i className="fas fa-map-marker-alt text-xl group-hover:text-[#FF6900] transition-colors"></i>
              </div>
              <div>
                <h6 className="text-sm font-semibold text-gray-400 mb-1">Address</h6>
                <p className="text-white">367 Hillcrest Lane, Irvine, California, USA</p>
              </div>
            </div>
            <div className="flex items-center footer-fade-in footer-stagger-delay-2 group">
              <div className="mr-4 text-white bg-gray-800 p-3 rounded-lg footer-pulse">
                <i className="fas fa-phone text-xl group-hover:text-[#FF6900] transition-colors"></i>
              </div>
              <div>
                <h6 className="text-sm font-semibold text-gray-400 mb-1">Phone</h6>
                <p className="text-white">310-437-2766</p>
              </div>
            </div>
            <div className="flex items-center footer-fade-in footer-stagger-delay-3 group">
              <div className="mr-4 text-white bg-gray-800 p-3 rounded-lg footer-pulse">
                <i className="fas fa-envelope text-xl group-hover:text-[#FF6900] transition-colors"></i>
              </div>
              <div>
                <h6 className="text-sm font-semibold text-gray-400 mb-1">Email</h6>
                <p className="text-white">info@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">Copyright © 2024 AIMporo Marketplace. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors footer-link">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-gray-400 hover:text-white transition-colors footer-link">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
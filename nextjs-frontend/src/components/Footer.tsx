import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-800 text-white">
      <div className="section-bg relative">
        <div className="footer-bg-one absolute top-0 left-0 w-full h-full opacity-10">
          {/* Footer background image - would be added in production */}
        </div>
        <div className="footer-bg-two absolute top-0 right-0 w-full h-full opacity-10">
          {/* Footer background image - would be added in production */}
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="footer-top">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="footer-widget" data-aos="fade-up" data-aos-delay={500}>
              <Link href="/">
                <div className="mb-4">
                  <Image 
                    src="/assets/img/aimporo-logo.png" 
                    alt="Aimporo Logo" 
                    width={160}
                    height={40}
                    className="logo"
                  />
                </div>
              </Link>
              <p className="mb-6 text-gray-300">
                Our mission is to lead the way in digital transformation
                and automation. We aim to enabling them to navigate the
                evolving digital landscape with confidence.
              </p>
              <div className="social-links">
                <ul className="flex gap-4">
                  <li>
                    <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                      <i className="fa-brands fa-facebook"></i>
                      <span className="sr-only">Facebook</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                      <i className="fa-brands fa-twitter"></i>
                      <span className="sr-only">Twitter</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                      <i className="fa-brands fa-instagram"></i>
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                      <i className="fa-brands fa-google"></i>
                      <span className="sr-only">Google</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-white hover:text-blue-400 transition-colors">
                      <i className="fa-brands fa-youtube"></i>
                      <span className="sr-only">YouTube</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-widget" data-aos="fade-up" data-aos-delay={600}>
              <h3 className="text-xl font-bold mb-6">Our Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about-us" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Categories</Link>
                </li>
                <li>
                  <Link href="/add-gigs" className="text-gray-300 hover:text-blue-400 transition-colors">Create Gigs</Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget" data-aos="fade-up" data-aos-delay={800}>
              <h3 className="text-xl font-bold mb-6">Dashboard</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/user/purchase" className="text-gray-300 hover:text-blue-400 transition-colors">Purchase</Link>
                </li>
                <li>
                  <Link href="/user/sales" className="text-gray-300 hover:text-blue-400 transition-colors">Sales</Link>
                </li>
                <li>
                  <Link href="/user/payment" className="text-gray-300 hover:text-blue-400 transition-colors">Payments</Link>
                </li>
                <li>
                  <Link href="/user/files" className="text-gray-300 hover:text-blue-400 transition-colors">Files</Link>
                </li>
                <li>
                  <Link href="/user/wishlist" className="text-gray-300 hover:text-blue-400 transition-colors">Wishlist</Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget" data-aos="fade-up" data-aos-delay={700}>
              <h3 className="text-xl font-bold mb-6">Featured Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Programming &amp; Tech</Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Music &amp; Audio</Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Lifestyle</Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Photography</Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Business</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">eBook Publishing</Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">AI Artists</Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">AI Services</Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Data</Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-300 hover:text-blue-400 transition-colors">Consulting</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="location-item flex gap-4 items-start">
                <span className="text-blue-400 text-xl mt-1">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <div>
                  <h6 className="text-lg font-semibold mb-1">Address</h6>
                  <p className="text-gray-300">367 Hillcrest Lane, Irvine, California, USA</p>
                </div>
              </div>
              <div className="location-item flex gap-4 items-start">
                <span className="text-blue-400 text-xl mt-1">
                  <i className="fas fa-phone"></i>
                </span>
                <div>
                  <h6 className="text-lg font-semibold mb-1">Phone</h6>
                  <p className="text-gray-300">310-437-2766</p>
                </div>
              </div>
              <div className="location-item flex gap-4 items-start">
                <span className="text-blue-400 text-xl mt-1">
                  <i className="fas fa-envelope"></i>
                </span>
                <div>
                  <h6 className="text-lg font-semibold mb-1">Email</h6>
                  <p className="text-gray-300">info@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="copy-right mb-4 md:mb-0">
              <p className="text-gray-400">&copy; {new Date().getFullYear()} AIMporo Marketplace. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <ul className="flex flex-wrap gap-6">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-conditions" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
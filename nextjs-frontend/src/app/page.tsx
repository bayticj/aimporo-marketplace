'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import GigCard from '../components/GigCard';
import SlideableGigCards from '../components/SlideableGigCards';

// Add AOS type declaration
declare global {
  interface Window {
    AOS: any;
  }
}

export default function Home() {
  // Console log for debugging
  useEffect(() => {
    console.log('Home component mounted');
    
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init();
      console.log('AOS initialized from component');
    }
    
    // Debug slick slider
    if (typeof Slider !== 'undefined') {
      console.log('Slider is defined');
    } else {
      console.log('Slider is undefined');
    }
  }, []);

  // Featured categories
  const categories = [
    { id: 1, name: 'Digital Marketing', icon: '/assets/img/aimporo-logo.png' },
    { id: 2, name: 'Web Development', icon: '/assets/img/aimporo-logo.png' },
    { id: 3, name: 'Graphic Design', icon: '/assets/img/aimporo-logo.png' },
    { id: 4, name: 'Content Writing', icon: '/assets/img/aimporo-logo.png' },
    { id: 5, name: 'AI Services', icon: '/assets/img/aimporo-logo.png' },
    { id: 6, name: 'Mobile Apps', icon: '/assets/img/aimporo-logo.png' },
  ];

  // Example gigs with updated image paths to use existing images
  const gigs = [
    {
      id: 1,
      title: 'Professional Logo Design',
      price: 49.99,
      rating: 4.8,
      reviews: 124,
      images: ['/assets/img/gigs/gigs-01.jpg', '/assets/img/gigs/gigs-02.jpg'],
      seller: 'CreativeStudio',
      location: 'New York',
      badge: 'Programming & Tech',
      featured: true,
      hot: true,
      delivery: '1 day'
    },
    {
      id: 2,
      title: 'WordPress Website Development',
      price: 199.99,
      rating: 4.9,
      reviews: 89,
      images: ['/assets/img/gigs/gigs-03.jpg', '/assets/img/gigs/gigs-04.jpg'],
      seller: 'WebWizards',
      location: 'London',
      badge: 'Videography',
      hot: true,
      delivery: '2 days'
    },
    {
      id: 3,
      title: 'SEO Optimization Package',
      price: 149.99,
      rating: 4.7,
      reviews: 67,
      images: ['/assets/img/gigs/gigs-05.jpg', '/assets/img/gigs/gigs-06.jpg'],
      seller: 'RankBooster',
      location: 'Canada',
      badge: 'Music & Audio',
      featured: true,
      delivery: '1 day'
    },
    {
      id: 4,
      title: 'Social Media Content Creation',
      price: 99.99,
      rating: 4.6,
      reviews: 52,
      images: ['/assets/img/gigs/gigs-07.jpg', '/assets/img/gigs/gigs-08.jpg'],
      seller: 'ViralVision',
      location: 'Australia',
      badge: 'Digital Marketing',
      delivery: '3 days'
    },
    // Adding more gigs for better filter demonstration
    {
      id: 5,
      title: 'Mobile App Development',
      price: 299.99,
      rating: 5.0,
      reviews: 42,
      images: ['/assets/img/gigs/gigs-01.jpg', '/assets/img/gigs/gigs-02.jpg'],
      seller: 'AppMasters',
      location: 'San Francisco',
      badge: 'Programming & Tech',
      featured: true,
      hot: true,
      delivery: '7 days'
    },
    {
      id: 6,
      title: 'E-commerce Store Setup',
      price: 249.99,
      rating: 4.5,
      reviews: 78,
      images: ['/assets/img/gigs/gigs-03.jpg', '/assets/img/gigs/gigs-04.jpg'],
      seller: 'ShopifyPro',
      location: 'Toronto',
      badge: 'Digital Marketing',
      hot: false,
      delivery: '3 days'
    },
    {
      id: 7,
      title: 'Video Editing & Production',
      price: 149.99,
      rating: 4.9,
      reviews: 105,
      images: ['/assets/img/gigs/gigs-05.jpg', '/assets/img/gigs/gigs-06.jpg'],
      seller: 'VisualCraft',
      location: 'Los Angeles',
      badge: 'Videography',
      featured: false,
      hot: true,
      delivery: '2 days'
    },
    {
      id: 8,
      title: 'Content Writing Services',
      price: 79.99,
      rating: 4.7,
      reviews: 93,
      images: ['/assets/img/gigs/gigs-07.jpg', '/assets/img/gigs/gigs-08.jpg'],
      seller: 'WordSmith',
      location: 'Chicago',
      badge: 'Writing & Translation',
      featured: false,
      hot: false,
      delivery: '1 day'
    }
  ];

  // State for favorites
  const [favorites, setFavorites] = useState(Array(gigs.length).fill(false));

  // Toggle favorite for a gig
  const toggleFavorite = (index: number) => {
    setFavorites(prev => {
      const newFavorites = [...prev];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  // Basic slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // Let's create a basic test slider
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      role: 'CEO, TechStart',
      rating: 5,
      comment: 'The quality of services I received was exceptional. The seller was professional and delivered exactly what I needed.',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      rating: 5,
      comment: 'AIMporo Marketplace has transformed how we outsource our projects. The platform is intuitive and the talent is outstanding.',
    },
    {
      id: 3,
      name: 'Michael Brown',
      role: 'Freelance Designer',
      rating: 5,
      comment: 'As a freelancer, I\'ve found amazing opportunities through this platform. The payment system is secure and the support is excellent.',
    },
  ];

  // Testimonial slider settings
  const testimonialSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="banner-bg-imgs">
          {/* Background images would be added in production */}
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8" data-aos="fade-up">
              <div className="banner-head">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Find the Best Instant Services Marketplace.</h1>
                <p className="text-xl mb-8">A large number of individuals use us to transform their thoughts into the real world.</p>
              </div>
              <div className="banner-form bg-white p-6 rounded-lg shadow-lg">
                <form className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg">
                      <option>All Categories</option>
                      <option>Digital Marketing</option>
                      <option>Design & Creative</option>
                      <option>Programming & Tech</option>
                      <option>Writing & Translation</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <div className="relative">
                      <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Miami, USA" />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <i className="fas fa-map-pin"></i>
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Keyword</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Need Graphic Designer" />
                  </div>
                  <div className="flex items-end">
                    <button type="button" className="btn-primary py-3 px-6">
                      <i className="fas fa-search mr-2"></i> Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="popular-search mt-6">
                <h5 className="font-medium mb-2">Popular Searches: </h5>
                <ul className="flex flex-wrap gap-3">
                  <li><Link href="#" className="text-blue-600 hover:underline">Online Mockup</Link></li>
                  <li><Link href="#" className="text-blue-600 hover:underline">Carpentering</Link></li>
                  <li><Link href="#" className="text-blue-600 hover:underline">Event Organiser</Link></li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="banner-img relative">
                <div className="relative h-80 w-full">
                  <Image 
                    src="/assets/img/banner-img.png"
                    alt="AIMporo Marketplace"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                {/* Small background elements would be added in production */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gigs Section - Using fixed SlideableGigCards */}
      <SlideableGigCards 
        gigs={gigs} 
        title="Explore Our <span>Gigs.</span>"
        subtitle="Find the perfect services for your business from our diverse range of categories"
      />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-heading text-center mb-12">
            <h2>Popular <span>Categories</span></h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Find the perfect services for your business from our diverse range of categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link 
                href={`/category/${category.id}`} 
                key={category.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Image 
                    src={category.icon}
                    alt={category.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-lg font-medium text-center">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-heading text-center mb-12" data-aos="fade-up">
            <h2>How It <span>Works</span></h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Simple steps to start using our marketplace services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
            <div className="flex flex-col items-center text-center">
              <div className="process-icon mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Discover Services</h3>
              <p className="text-gray-600">Browse through thousands of services and digital products from our verified sellers.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="process-icon mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">Purchase Securely</h3>
              <p className="text-gray-600">Make secure payments and communicate with sellers about your requirements.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="process-icon mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Receive & Review</h3>
              <p className="text-gray-600">Get your completed service or product and provide feedback on your experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-heading text-center mb-12" data-aos="fade-up">
            <h2>What Our <span>Customers</span> Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Hear from our satisfied customers about their experience with our marketplace</p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <Slider {...testimonialSliderSettings} className="testimonial-slider">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="px-2">
                  <div className="testimonial-card">
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6">{testimonial.comment}</p>
                    <div className="testimonial-user">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-[#FF6900] text-white">
        <div className="container mx-auto px-4 text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of businesses and professionals on AIMporo Marketplace today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-white text-[#FF6900] hover:bg-gray-100 px-8 py-3 rounded-lg font-medium">
                Sign Up Now
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white hover:text-[#FF6900] px-8 py-3 rounded-lg font-medium">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';

const Services = () => {
  // Sample services data
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom websites built with the latest technologies to meet your business needs.',
      image: '/assets/img/services/service-01.jpg',
      price: 'From $499',
      rating: 4.9,
      reviews: 124
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      image: '/assets/img/services/service-02.jpg',
      price: 'From $799',
      rating: 4.8,
      reviews: 98
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience and engagement.',
      image: '/assets/img/services/service-03.jpg',
      price: 'From $349',
      rating: 4.7,
      reviews: 87
    },
    {
      id: 4,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      image: '/assets/img/services/service-04.jpg',
      price: 'From $299',
      rating: 4.8,
      reviews: 112
    },
    {
      id: 5,
      title: 'Content Writing',
      description: 'Professional content creation services for websites, blogs, and social media.',
      image: '/assets/img/services/service-05.jpg',
      price: 'From $199',
      rating: 4.6,
      reviews: 76
    },
    {
      id: 6,
      title: 'SEO Optimization',
      description: "Search engine optimization to improve your website\'s visibility and ranking.",
      image: '/assets/img/services/service-06.jpg',
      price: 'From $249',
      rating: 4.7,
      reviews: 93
    }
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-img">
          <div className="breadcrumb-left">
            <Image 
              src="/assets/img/bg/banner-bg-03.png" 
              alt="Background" 
              width={1920} 
              height={300}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Services
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Our Services</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mb-5">
              <div className="section-heading">
                <h2>Explore Our Services</h2>
                <p>Discover our wide range of professional services designed to meet your needs</p>
              </div>
            </div>
          </div>
          
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-lg-4 col-md-6 mb-4">
                <div className="service-card">
                  <div className="service-img">
                    <Link href={`/services/${service.id}`}>
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        width={400} 
                        height={250}
                        className="img-fluid"
                      />
                    </Link>
                    <div className="service-overlay">
                      <div className="service-badges">
                        <span className="featured">Featured</span>
                      </div>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">
                      <Link href={`/services/${service.id}`}>{service.title}</Link>
                    </h3>
                    <p>{service.description}</p>
                    <div className="service-info">
                      <div className="service-rating">
                        <i className="fas fa-star filled"></i>
                        <span>{service.rating} ({service.reviews} reviews)</span>
                      </div>
                      <div className="service-price">
                        <h6>{service.price}</h6>
                      </div>
                    </div>
                    <div className="service-btn">
                      <Link href={`/services/${service.id}`} className="btn btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* /Services */}

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="cta-content text-center">
                <h2>Ready to get started?</h2>
                <p>Join thousands of satisfied clients who have experienced our services</p>
                <Link href="/contact" className="btn btn-primary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Call to Action */}
    </div>
  );
};

export default Services; 
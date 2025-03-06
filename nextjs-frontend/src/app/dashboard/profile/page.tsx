'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar, FaCircle, FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';

// Sample data - in a real app, this would come from an API
const userData = {
  name: 'Adrian Revolt',
  tagline: 'An abundance of creativity',
  rating: 5.0,
  reviewCount: 45,
  country: 'United States',
  memberSince: '25 Jan 2024',
  languages: ['English', 'Portuguese'],
  about: 'Hello, Greetings! My name is Adrian, a professional embroidery digitizer who converts an Image into embroidery files such as DST, PES or any other. I can produce an embroidery design file without any fabric puckering. I\'m the guy who has more than 15 years of experience in the field of embroidery design digitizing. I love what I do because embroidery digitizing is my passion and profession. so, get in touch with me if you have any question. thank you!',
  skills: ['Logo design', 'Graphics Design', 'Adobe illustrator'],
  recentWorks: [
    '/assets/img/service/service-slide-01.jpg',
    '/assets/img/service/service-slide-02.jpg',
    '/assets/img/service/service-slide-03.jpg',
    '/assets/img/service/service-slide-04.jpg'
  ],
  reviews: [
    {
      id: 1,
      username: 'kadajsalamander',
      location: 'London',
      rating: 5.0,
      timeAgo: '1 Month ago',
      avatar: '/assets/img/user/user-01.jpg',
      comment: 'Adrian was amazing to work with. He understood exactly what I needed and delivered the perfect design. The communication was excellent throughout the process, and he was very responsive to my feedback. I would definitely work with him again!'
    },
    {
      id: 2,
      username: 'johndoe',
      location: 'New York',
      rating: 4.8,
      timeAgo: '2 Months ago',
      avatar: '/assets/img/user/user-02.jpg',
      comment: 'Great experience working with Adrian. He delivered high-quality work on time and was very professional throughout the project. Would recommend!'
    },
    {
      id: 3,
      username: 'sarahjones',
      location: 'Sydney',
      rating: 5.0,
      timeAgo: '3 Months ago',
      avatar: '/assets/img/user/user-03.jpg',
      comment: 'Exceptional service! Adrian went above and beyond to ensure I was satisfied with the final product. His attention to detail is impressive.'
    }
  ]
};

// Review sort options
const reviewSortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'highest', label: 'Highest Rating' },
  { value: 'lowest', label: 'Lowest Rating' }
];

export default function ProfilePage() {
  const [selectedSort, setSelectedSort] = useState(reviewSortOptions[0]);

  // Slider settings for recent works
  const workSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Custom arrows for slider
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-nav slick-nav-next`}
        style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-nav slick-nav-prev`}
        style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Breadcrumb */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <span className="mx-2">/</span>
            <span>Profile</span>
          </div>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image 
                    src="/assets/img/profiles/avatar-1.jpg" 
                    alt={userData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
                    <span className="ml-2 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full flex items-center">
                      <FaCircle className="mr-1 text-green-500" size={8} />
                      Online
                    </span>
                  </div>
                  <p className="text-gray-600">{userData.tagline}</p>
                  <div className="flex items-center mt-1 text-sm">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>Ratings {userData.rating} ({userData.reviewCount} Reviews)</span>
                  </div>
                </div>
              </div>
              <button className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                  <FaMapMarkerAlt className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{userData.country}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                  <FaStar className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{userData.memberSince}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                  <FaLanguage className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Speaks</p>
                  <p className="font-medium">{userData.languages.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About Me</h3>
            <p className="text-gray-600">{userData.about}</p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <div key={index} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                  <FaCircle className="text-blue-500 mr-2" size={8} />
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Works */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Checkout My Recent Works</h3>
            </div>
            <div className="recent-works-slider">
              <Slider {...workSliderSettings}>
                {userData.recentWorks.map((work, index) => (
                  <div key={index} className="px-2">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image 
                        src={work} 
                        alt={`Recent work ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Reviews ({userData.reviewCount})</h3>
              <div className="flex items-center mt-2 sm:mt-0">
                <span className="mr-2 text-gray-600">Sort By:</span>
                <select 
                  className="border rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedSort.value}
                  onChange={(e) => {
                    const selected = reviewSortOptions.find(option => option.value === e.target.value);
                    if (selected) setSelectedSort(selected);
                  }}
                >
                  {reviewSortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {userData.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/4 mb-4 md:mb-0">
                      <div className="flex items-center">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                          <Image 
                            src={review.avatar} 
                            alt={review.username}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h6 className="font-medium text-gray-800">
                            <Link href="#" className="hover:text-blue-600">{review.username}</Link>
                          </h6>
                          <p className="text-sm text-gray-500 flex items-center">
                            <FaMapMarkerAlt className="mr-1" size={12} />
                            {review.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-3/4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"} 
                              size={16}
                            />
                          ))}
                          <span className="ml-2 text-gray-700">{review.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500">{review.timeAgo}</p>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {userData.reviewCount > 3 && (
              <div className="mt-6 text-center">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
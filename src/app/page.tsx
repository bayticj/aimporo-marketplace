import React from 'react';

export default function Home() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Find the Best Instant Services Marketplace.</h1>
              <p>A large number of individuals use us to transform their thoughts into the real world.</p>
              
              <div className="hero-search-box">
                <form>
                  <div className="search-input-group">
                    <div className="search-field">
                      <label>Category</label>
                      <select>
                        <option value="">Select Digital Marketing</option>
                        <option value="writing">Writing</option>
                        <option value="social-media">Social Media</option>
                      </select>
                    </div>
                    
                    <div className="search-field">
                      <label>Location</label>
                      <div className="location-input">
                        <i className="fas fa-map-marker-alt"></i>
                        <input type="text" placeholder="Location" />
                      </div>
                    </div>
                    
                    <div className="search-field">
                      <label>Keyword</label>
                      <input type="text" placeholder="Keyword" />
                    </div>
                    
                    <button type="submit" className="search-btn">
                      <i className="fas fa-search"></i> Search
                    </button>
                  </div>
                </form>
                
                <div className="popular-searches">
                  <span>Popular Searches:</span>
                  <a href="/search?keyword=online+mockup">Online Mockup</a>
                  <a href="/search?keyword=carpentering">Carpentering</a>
                  <a href="/search?keyword=event+organiser">Event Organiser</a>
                </div>
              </div>
            </div>
            
            <div className="hero-image">
              <img src="/images/hero-image.jpg" alt="Hero" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gigs Section */}
      <section className="featured-gigs-section">
        <div className="container">
          <h2 className="section-title">Explore Our Gigs.</h2>
          
          <div className="tabs">
            <button className="tab active">Popular</button>
            <button className="tab">Latest</button>
            <button className="tab">Top Ratings</button>
            <button className="tab">Trending</button>
          </div>
          
          <div className="gigs-grid">
            {/* Gig Card 1 */}
            <div className="gig-card">
              <div className="gig-image">
                <img src="/images/gigs/gig-1.jpg" alt="Gig" />
                <div className="gig-badges">
                  <span className="badge featured">Featured</span>
                  <span className="badge hot">Hot</span>
                </div>
                <div className="gig-user">
                  <img src="/images/avatars/user-1.jpg" alt="User" />
                  <span>John Doe</span>
                </div>
                <div className="gig-category">Programming & Tech</div>
              </div>
              <div className="gig-content">
                <div className="gig-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>New York</span>
                </div>
                <h3 className="gig-title">
                  <a href="/gigs/1">Embedded Android & AOSP customizations</a>
                </h3>
                <div className="gig-rating">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span>(28 Reviews)</span>
                </div>
                <div className="gig-footer">
                  <div className="gig-delivery">Delivery in 1 day</div>
                  <div className="gig-price">$780</div>
                </div>
              </div>
            </div>
            
            {/* Add more gig cards as needed */}
          </div>
        </div>
      </section>
    </div>
  );
} 
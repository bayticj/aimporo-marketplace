import React from 'react';

interface TestimonialCardProps {
  quote: string;
  title: string;
  highlightedWord: string;
  author: {
    name: string;
    location: string;
    avatar: string;
  };
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  title,
  highlightedWord,
  author,
  delay
}) => {
  return (
    <div 
      className="testimonial-card" 
      data-aos="fade-up" 
      data-aos-delay={delay}
    >
      <div className="testimonial-card-inner">
        <div className="testimonial-quote-mark">&ldquo;</div>
        <h3 className="testimonial-title">
          {title} <span className="text-orange-500">{highlightedWord}</span>
        </h3>
        <p className="testimonial-text">&ldquo;{quote}&rdquo;</p>
        
        <div className="testimonial-rating">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="testimonial-star" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ))}
        </div>
        
        <div className="testimonial-user">
          <div className="testimonial-avatar-container">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="testimonial-avatar"
            />
            <div className="testimonial-avatar-glow"></div>
          </div>
          <div className="testimonial-user-info">
            <h4 className="testimonial-user-name">{author.name}</h4>
            <p className="testimonial-user-location">{author.location}</p>
          </div>
        </div>
        
        <div className="testimonial-decoration-dots">
          <span className="dot dot-1"></span>
          <span className="dot dot-2"></span>
          <span className="dot dot-3"></span>
          <span className="dot dot-4"></span>
          <span className="dot dot-5"></span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard; 
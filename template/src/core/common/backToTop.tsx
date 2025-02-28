import React, { useState, useEffect } from 'react';
import ImageWithBasePath from '../img';
import { Link } from 'react-router-dom';

const BackToTop = () => {
  const [show, setShow] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`back-to-top`}>
      <Link
        onClick={scrollToTop}
        className={`back-to-top-icon align-items-center justify-content-center d-flex ${show ? 'show' : ''}`}
        to="#"
      >
        <ImageWithBasePath src="assets/img/icons/arrow-badge-up.svg" alt="img" />
      </Link>
    </div>
  );
};

export default BackToTop;

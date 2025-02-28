import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../core/common/header';
import { Outlet } from 'react-router-dom';
import Footer from '../core/common/footer';
import Cursor from '../core/common/cursor';
import BackToTop from '../core/common/backToTop';
import { all_routes } from './router/all_routes';

const FeatureApp = () => {
  const routes = all_routes;
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const isHomeRoute = location.pathname === routes.home;
    const isChatPage = location.pathname === "/user-dashboard/user-message";

    setShowLoader(isHomeRoute);

    if (isChatPage) {
      document.body.classList.add("chat-page", "main-chat-blk");
    } else {
      document.body.classList.remove("chat-page", "main-chat-blk");
    }

    if (isHomeRoute) {
      const timeoutId = setTimeout(() => {
        setShowLoader(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
        document.body.classList.remove("chat-page", "main-chat-blk");
      };
    }

    window.scrollTo(0, 0);
  }, [location.pathname, routes.home]);

  const Preloader = () => (
    <div className="loader-main">
      <span className="page-loader"></span>
    </div>
  );

  return (
    <div>
      {showLoader ? (
        <div className={`main-wrapper ${location.pathname.includes('user-message') ? 'chat-wrapper' : ''}`}>
          <Preloader />
          <Header />
          <Outlet />
          <Footer />
          <Cursor />
          <BackToTop />
        </div>
      ) : (
        <div className={`main-wrapper ${location.pathname.includes('user-message') ? 'chat-wrapper' : ''}`}>
          <Header />
          <Outlet />
          <Footer />
          <Cursor />
          <BackToTop />
        </div>
      )}
    </div>
  );
};

export default FeatureApp;

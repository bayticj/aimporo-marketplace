import React from 'react'
import { Navigate, Route } from 'react-router-dom';
import { all_routes } from './all_routes';
import Home from '../home';
import Error404 from '../pages/error/error404';
import AboutUs from '../pages/about_us';

import BlogGrid from '../blog/blog_grid';
import Blog2Grid from '../blog/blog_2_grid';
import ContactUs from '../contact/contact_us';
import ContactUsV2 from '../contact/contact_us_v2';
import ContactUsV3 from '../contact/contact_us_v3';
import ComingSoon from '../pages/comingSoon';
import AddGigs from '../gigs/add-gigs';
import Faq from '../pages/faq';
import Portfolio from '../pages/portfolio';
import PortfolioDetails from '../pages/portfolio-details';
import Pricing from '../pages/pricing';
import PrivacyPolicy from '../pages/privacy-policy';
import TermCondition from '../pages/termcondition';
import UnderCondition from '../pages/under-condition';
import Categories from '../gigs/categories';
import Categories2 from '../gigs/categories-2';
import Service from '../gigs/service';
import ServiceDetails from '../gigs/service-details';
import ServiceGridSidebar from '../gigs/service-grid-sidebar';
import ServiceSubCategory from '../gigs/service-sub-category';
import Error500 from '../pages/error/error500';
import EditGigs from '../gigs/edit-gigs';
import BlogCarousel from '../blog/blog-carousel';
import BlogDetails from '../blog/blog-details';
import BlogDetailsRightSidebar from '../blog/blog-details-right-sidebar';
import BlogList from '../blog/blog-list';
import BlogMansory from '../blog/blog-mansory';
import BlogRightSidebar from '../blog/blog-right-sidebar';
import BlogDetailsSidebar from '../blog/blog-details-sidebar';
import BlogSidebar from '../blog/blog-sidebar';
import Dashboard from '../user-dashboard/dashboard';
import UserGigs from '../user-dashboard/user-gigs';
import UserPurchase from '../user-dashboard/user-purchase';
import UserFiles from '../user-dashboard/user-files';
import UserReview from '../user-dashboard/user-review';
import UserSales from '../user-dashboard/user-sales';
import UserWishlist from '../user-dashboard/user-wishlist';
import UserMessage from '../user-dashboard/user-message';
import UserWallet from '../user-dashboard/user-wallet';
import UserPayment from '../user-dashboard/user-payment';
import UserSetting from '../user-dashboard/user-setting';
import SecuritySetting from '../user-dashboard/security-setting';
import PreferenceSetting from '../user-dashboard/preference-setting';
import BillingSetting from '../user-dashboard/billing-setting';
import NotificationSetting from '../user-dashboard/notification-setting';
import IntegrationSetting from '../user-dashboard/integration-setting';
import UserProfile from '../user-dashboard/user-profile';
import SignIn from '../pages/auth/signin';
import SignUp from '../pages/auth/signup';
import ForgotPassword from '../pages/auth/forgot-password';
import ChangePassword from '../pages/auth/change-password';
import LockScreen from '../pages/auth/lock-screen';
import Team from '../pages/our-team/team';
import TeamCarousel from '../pages/our-team/teamCarousel';
import TeamDetails from '../pages/our-team/teamDetails';
import UserNotification from '../user-dashboard/user-notification';


const routes = all_routes;

export const publicRoutes = [
    {
        path: "/",
        exact: true,
        element: <Navigate to={routes.home} />, // Redirect to the home route
      },
      {
        path: routes.home,
        element: <Home />,
        route: Route,
      },


      //pages route
      {
        path: routes.aboutUs,
        element: <AboutUs />,
        route: Route,
      },
     
      {
        path: routes.faq,
        element: <Faq  />,
        route: Route,
      },
      {
        path: routes.portfolio,
        element: <Portfolio/>,
        route: Route,
      },
      {
        path: routes.portfolioDetails,
        element: <PortfolioDetails/>,
        route: Route,
      },
      {
        path: routes.pricing,
        element: <Pricing />,
        route: Route,
      },
      {
        path: routes.privacyPolicy,
        element: <PrivacyPolicy />,
        route: Route,
      },
      {
        path: routes.termCondition,
        element: <TermCondition />,
        route: Route,
      },
     



      //gigs route
      {
        path: routes.addGigs,
        element: <AddGigs />,
        route: Route,
      },
      {
        path: routes.categories,
        element: <Categories />,
        route: Route,
      },
      {
        path: routes.categories2,
        element: <Categories2 />,
        route: Route,
      },
      {
        path: routes.service,
        element: <Service />,
        route: Route,
      },
      {
        path: routes.serviceDetails,
        element: <ServiceDetails/>,
        route: Route,
      },
      {
        path: routes.serviceGridSidebar,
        element: <ServiceGridSidebar/>,
        route: Route,
      },
      {
        path: routes.serviceSubCategory,
        element: <ServiceSubCategory/>,
        route: Route,
      },


      //blog grid
      {
        path: routes.blogGrid,
        element: <BlogGrid />,
        route: Route,
      },
      {
        path: routes.blog2Grid,
        element: <Blog2Grid />,
        route: Route,
      },
      {
        path: routes.blogCarousel,
        element: <BlogCarousel />,
        route: Route,
      },
      {
        path: routes.blogDetails,
        element: <BlogDetails />,
        route: Route,
      },
      {
        path: routes.blogDetailsRightSidebar,
        element: <BlogDetailsRightSidebar />,
        route: Route,
      },
      {
        path: routes.blogList,
        element: <BlogList />,
        route: Route,
      },
      {
        path: routes.blogMansory,
        element: <BlogMansory />,
        route: Route,
      },
      {
        path: routes.blogRightSidebar,
        element: <BlogRightSidebar />,
        route: Route,
      },
      {
        path: routes.blogDetailsSidebar,
        element: <BlogDetailsSidebar />,
        route: Route,
      },
      {
        path: routes.blogSidebar,
        element: <BlogSidebar />,
        route: Route,
      },

      //contact
      {
        path: routes.contactUs,
        element: <ContactUs />,
        route: Route,
      },
      {
        path: routes.contactUsV2,
        element: <ContactUsV2 />,
        route: Route,
      },
      {
        path: routes.contactUsV3,
        element: < ContactUsV3 />,
        route: Route,
      },

      //user Dashboard
      {
        path: routes.editGigs,
        element: <EditGigs />,
        route: Route,
      },
      {
        path: routes.dashboard,
        element: <Dashboard />,
        route: Route,
      },
      {
        path: routes.userProfile,
        element: <UserProfile />,
        route: Route,
      },
      {
        path: routes.userGigs,
        element: <UserGigs />,
        route: Route,
      },
      {
        path: routes.userPurchase,
        element: <UserPurchase />,
        route: Route,
      },
      {
        path: routes.userFiles,
        element: <UserFiles />,
        route: Route,
      },
      {
        path: routes.userFiles,
        element: <UserFiles />,
        route: Route,
      },
      {
        path: routes.userReview,
        element: <UserReview />,
        route: Route,
      },
      {
        path: routes.userSales,
        element: <UserSales />,
        route: Route,
      },
      {
        path: routes.userWishlist,
        element: <UserWishlist />,
        route: Route,
      },
      {
        path: routes.userMessage,
        element: <UserMessage />,
        route: Route,
      },
      {
        path: routes.userWallet,
        element: <UserWallet />,
        route: Route,
      },
      {
        path: routes.userPayment,
        element: <UserPayment />,
        route: Route,
      },
      {
        path: routes.userSetting,
        element: <UserSetting />,
        route: Route,
      },
      {
        path: routes.securitySetting,
        element: <SecuritySetting />,
        route: Route,
      },
      {
        path: routes.prefernceSetting,
        element: <PreferenceSetting />,
        route: Route,
      },
      {
        path: routes.billingSetting,
        element: <BillingSetting />,
        route: Route,
      },
      {
        path: routes. notificationSetting,
        element: <NotificationSetting />,
        route: Route,
      },
      {
        path: routes.integrationSetting,
        element: <IntegrationSetting />,
        route: Route,
      },
      {
        path: routes.team,
        element: <Team />,
        route: Route,
      },
      {
        path: routes.teamCarousel,
        element: <TeamCarousel />,
        route: Route,
      },
      {
        path: routes.teamDetails,
        element: <TeamDetails />,
        route: Route,
      },
      {
        path: routes.userNotification,
        element: <UserNotification />,
        route: Route,
      },
];

export const authRoutes = [
  {
    path: routes.error404,
    element: <Error404 />,
    route: Route,
  },
  {
    path: routes.error500,
    element: <Error500/>,
    route: Route,
  },
  {
    path: routes.comingSoon,
    element: <ComingSoon/>,
    route: Route,
  },
  {
    path: routes.underCondition,
    element: <UnderCondition />,
    route: Route,
  },
  {
    path: routes.signIn,
    element: <SignIn />,
    route: Route,
  },
  {
    path: routes.signUp,
    element: <SignUp />,
    route: Route,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
    route: Route,
  },
  {
    path: routes.changePassword,
    element: <ChangePassword />,
    route: Route,
  },
  {
    path: routes.lockScreen,
    element: <LockScreen/>,
    route: Route,
  },
  
]
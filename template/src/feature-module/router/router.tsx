import React from 'react'
import { Route, Routes } from 'react-router'
import { authRoutes, publicRoutes } from './router.link';
// import AuthFeature from '../authFeature';
import AuthApp from '../authApp';
import FeatureApp from '../featureApp';
import { all_routes } from './all_routes';
import { Navigate } from 'react-router-dom';

const ALLRoutes: React.FC = () => {

  const routes = all_routes;
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={routes.home} />} />
        <Route element={<FeatureApp />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route  element={<AuthApp />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  )
}

export default ALLRoutes

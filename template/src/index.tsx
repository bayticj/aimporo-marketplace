import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import './style/css/style.css';
import './style/icons/feather/css/iconfont.css';
import "./style/icons/boxicons/css/boxicons.min.css";
import './style/icons/fontawesome/css/all.min.css';
import './style/icons/fontawesome/css/fontawesome.min.css';
import { base_path } from './environment';
import AllRoutes from './feature-module/router/router';



const root = ReactDOM.createRoot( document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename={base_path}>
    <AllRoutes />
  </BrowserRouter>
);




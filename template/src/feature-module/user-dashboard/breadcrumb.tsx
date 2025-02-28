import React from 'react'
import { all_routes } from '../router/all_routes';
import ImageWithBasePath from '../../core/img';
import { Link } from 'react-router-dom';
export interface Props {
    page: string;
  }
const Breadcrumb: React.FC<Props>  = ({ page}) => {
    const routes = all_routes
  return (
    <>
          {/* Breadcrumb */}
          <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="breadcrumb-img">
          <div className="breadcrumb-left">
            <ImageWithBasePath src="assets/img/bg/banner-bg-03.png" alt="img" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={routes.home}>Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    {page}
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title mb-0">{page}</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
    </>
  )
}

export default Breadcrumb
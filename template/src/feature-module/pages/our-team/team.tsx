import React from 'react'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'

const Team = () => {
    const routes = all_routes
  return (
    <>
  {/* Breadcrumb */}
  <div className="breadcrumb-bar">
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
                Team
              </li>
            </ol>
          </nav>
          <h2 className="breadcrumb-title">Team</h2>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Team */}
  <section className="team-section team-section-list">
    <div className="container">
      <div className="row">
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-01.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Christopher Carlton</Link>
                </h4>
                <p>Chief Executing Officer</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-02.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Roberta Addison</Link>
                </h4>
                <p>Chief Technology Officer</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-03.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Bryant Stephan</Link>
                </h4>
                <p>Chief Financial Officer</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-07.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Helen Miller</Link>
                </h4>
                <p>Lead Software Developer</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-04.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Colby Sandoval</Link>
                </h4>
                <p>UI/UX Designer</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-08.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Margarete Kaitlin</Link>
                </h4>
                <p>Data Analyst</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-05.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Charles Hemphill</Link>
                </h4>
                <p>Sales Manager</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-09.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Angela Estrada</Link>
                </h4>
                <p>Product Manager</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
        {/* Team List */}
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="team-grid w-100">
            <div className="team-img">
              <div className="team-overlay-img">
                <ImageWithBasePath
                  src="assets/img/team/team-06.jpg"
                  className="img-fluid"
                  alt="Team"
                />
              </div>
              <div className="team-view-btn">
                <Link to={routes.teamDetails} className="btn btn-primary">
                  View Detail
                </Link>
              </div>
            </div>
            <div className="team-content">
              <div className="team-title">
                <h4>
                  <Link to={routes.teamDetails}>Robert Sherrard</Link>
                </h4>
                <p>Operations Manager</p>
              </div>
              <div className="team-social-links">
                <Link to="#" target="_blank">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
                <Link to="#" target="_blank">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /Team List */}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <ul>
          <li>
            <Link to="#" className="previous">
              <i className="fa-solid fa-chevron-left" />
            </Link>
          </li>
          <li>
            <Link to="#" className="active">
              1
            </Link>
          </li>
          <li>
            <Link to="#">2</Link>
          </li>
          <li>
            <Link to="#">3</Link>
          </li>
          <li>
            <Link to="#">4</Link>
          </li>
          <li>
            <Link to="#">5</Link>
          </li>
          <li>
            <Link to="#" className="next">
              <i className="fa-solid fa-chevron-right" />
            </Link>
          </li>
        </ul>
      </div>
      {/* /Pagination */}
    </div>
  </section>
  {/* /Team */}
</>

  )
}

export default Team
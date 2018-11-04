import React from 'react';
import FooterForm from './FooterForm';
import FooterSocialLinks from './FooterSocialLinks';
import FooterAddress from './FooterAddress';
import './HomeFooter.css';

const HomeFooter = () => (
  <div className="home-footer">
    <div className="text-center p-4 bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="my-3 col-lg-4 col-md-6">
            <FooterAddress />
          </div>
          <div className="my-3 col-lg-4 col-md-6">
            <FooterForm />
          </div>
          <div className="my-3 col-lg-4 col-md-12">
            <FooterSocialLinks />
          </div>
          <div className="col-md-12 text-center text-muted">
            <hr />
              © Copyright 2018 Authors Haven - All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomeFooter;

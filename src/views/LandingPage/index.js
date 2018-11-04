import React from 'react';
import ButtonLink from '../../components/ButtonLink';
import BenefitsAndCategories from './BenefitsAndCategories/index';
import Testimonials from './Testimonials/index';
import HomeFooter from './HomeFooter/index';
import AHLogo from '../../components/AHLogo';
import './LandingPage.css';
import * as routes from '../../routes';
import { benefitsArray, featuredCategories, testimonialsArray } from './__mocks__/mockData';

const LandingPageHeader = () => (
  <div className="text-center home-banner">
    <div className="container">
      <div className="row">
        <div className="py-5 col-md-12">
          <AHLogo className="landing-logo" />
          <h1 className="display-4 text-white">Authors Haven</h1>
          <h3 className="text-white">
            Big Ideas
          </h3>
          <ButtonLink to={routes.LOG_IN_ROUTE} className="btn-secondary mr-1" buttonText="Login" />
          <ButtonLink to={routes.SIGN_UP_ROUTE} className="btn-primary mx-1" buttonText="Signup" />
        </div>
      </div>
    </div>
  </div>
);


const LandingPage = () => (
  <React.Fragment>
    <LandingPageHeader />
    <div className="pt-5 bg-light">
      <BenefitsAndCategories
        benefitsArray={benefitsArray}
        featuredCategories={featuredCategories}
      />
      <Testimonials
        testimonialsArray={testimonialsArray}
      />
    </div>
    <HomeFooter />
  </React.Fragment>
);

export default LandingPage;

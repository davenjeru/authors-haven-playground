import React from 'react';
import ButtonLink from '../commons/ButtonLink';
import * as Ruth from '../../assets/images/ruth.jpg';
import * as Hos from '../../assets/images/hos.jpg';
import * as Chimammanda from '../../assets/images/face1.jpg';
import BenefitsAndCategories from './BenefitsAndCategories';
import Testimonials from './Testimonials';
import HomeFooter from './HomeFooter';
import AHLogo from '../commons/AHLogo';
import './LandingPage.css';

const benefitsArray = [
  {
    value: 'Authentic', emoji: '👌',
  },
  {
    value: 'Knowledgeable Authors', emoji: '📚',
  },
  {
    value: 'Membership', emoji: '💳',
  },
  {
    value: 'Affordable', emoji: '💸',
  },
  {
    value: 'Amazing', emoji: '😌',
  },
  {
    value: 'Fun', emoji: '🙌',
  }];

const featuredCategories = [
  {
    name: 'Technology',
    count: 312,
  },
  {
    name: 'Lifestyle',
    count: 299,
  },
  {
    name: 'Science',
    count: 259,
  },
  {
    name: 'Finance',
    count: 219,
  },
  {
    name: 'Politics',
    count: 155,
  }];

const testimonialsArray = [
  {
    name: 'Chimammanda',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    image: Chimammanda,
    role: 'Senior writer',
  },
  {
    name: 'Hoslack',
    text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec.',
    image: Hos,
    role: 'Reader',
  },
  {
    name: 'Ruth',
    text: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Cum sociis natoque penatibus et magnis dis parturient montes.',
    image: Ruth,
    role: 'Reader',
  }];

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
          <ButtonLink to="/login" className="btn-secondary mr-1" buttonText="Login" />
          <ButtonLink to="/signup" className="btn-primary mx-1" buttonText="Signup" />
        </div>
      </div>
    </div>
  </div>
);


const LandingPage = () => (
  <div>
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
  </div>
);

export default LandingPage;

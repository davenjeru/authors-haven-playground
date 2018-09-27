import React from 'react';
import FeaturedCategories from './FeaturedCategories';
import Benefits from './Benefits';

const BenefitsAndCategories = ({ featuredCategories, benefitsArray }) => (
  <div className="container">
    <div className="row text-center">
      <FeaturedCategories featuredCategories={featuredCategories} />
      <Benefits benefitsArray={benefitsArray} />
    </div>
  </div>
);

BenefitsAndCategories.propTypes = {
  ...FeaturedCategories.propTypes,
  ...Benefits.propTypes,
};

export default BenefitsAndCategories;

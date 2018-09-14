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
  featuredCategories: FeaturedCategories.propTypes.featuredCategories.isRequired,
  benefitsArray: Benefits.propTypes.benefitsArray.isRequired,
};

export default BenefitsAndCategories;

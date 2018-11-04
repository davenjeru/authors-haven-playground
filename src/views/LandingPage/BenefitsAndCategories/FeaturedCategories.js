import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const FeaturedCategories = ({ featuredCategories }) => (
  <div className="col-md-6">
    <h4 className="text-primary">Featured Categories</h4>
    <ul className="list-group">
      {featuredCategories.map(category => (
        <Link key={category.name} to="#technology">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <span className="badge badge-pill badge-secondary">{category.count}</span>
          </li>
        </Link>
      ))}
    </ul>
  </div>
);

FeaturedCategories.propTypes = {
  featuredCategories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
  },
  )).isRequired,
};

export default FeaturedCategories;

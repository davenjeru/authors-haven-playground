import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const ButtonLink = ({ to, className, buttonText }) => (
  <Link
    to={to}
    className={`btn ${className}`}
  >
    {buttonText}
  </Link>
);

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ButtonLink;

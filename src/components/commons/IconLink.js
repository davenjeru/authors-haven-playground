import PropTypes from 'prop-types';
import React from 'react';

const IconLink = ({
  href, target, linkClasses, iconClasses,
}) => (
  <a href={href} target={target} className={linkClasses}>
    <i className={iconClasses} />
  </a>
);

IconLink.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  linkClasses: PropTypes.string,
  iconClasses: PropTypes.string,
};

IconLink.defaultProps = {
  target: 'blank',
  linkClasses: '',
  iconClasses: '',
};

export default IconLink;

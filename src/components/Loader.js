import React from 'react';
import loader from '../assets/images/loader.svg';

const Loader = props => (
  <img src={loader} {...props} alt="Loading..." />
);

export default Loader;

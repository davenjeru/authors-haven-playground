import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';

const Main = ({ children, ...rest }) => (
  <main {...rest} role="main">
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.shape(),
};

Main.defaultProps = {
  children: <React.Fragment />,
};

export default Main;

import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';

const Main = ({ children, ...rest }) => (
  <main {...rest} role="main">
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.bool, PropTypes.shape(React.Component)],

    )),
};

Main.defaultProps = {
  children: <React.Fragment />,
};

export default Main;

import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';

const Main = ({ children, ...rest }) => (
  <main {...rest} role="main">
    {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType(
        [PropTypes.bool, PropTypes.shape(React.Component)],

      )),
    PropTypes.shape(),
  ]),
};

Main.defaultProps = {
  children: <React.Fragment />,
};

export default Main;

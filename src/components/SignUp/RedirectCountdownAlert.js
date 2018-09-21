import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

/** *This is the alert that will show the user that they will be redirected after a few seconds
 * @param secondsToRedirect: {number} The seconds remaining before redirecting */
const RedirectCountdownAlert = ({ secondsToRedirect }) => (
  <div
    className="sign-up-success-message alert alert-warning text-center"
    style={{ marginTop: '5em' }}
  >
    We will redirect you to the
    {' '}
    <Link to="/login">login</Link>
    {' '}
    page in
    {' '}
    <strong>{secondsToRedirect}</strong>
    {' '}
    seconds
  </div>
);

RedirectCountdownAlert.propTypes = {
  secondsToRedirect: PropTypes.number.isRequired,
};

export default RedirectCountdownAlert;

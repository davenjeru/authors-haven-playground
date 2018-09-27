import React from 'react';
import PropTypes from 'prop-types';

const FormInputField = ({
  placeholder, required, name, className, ...rest
}) => (
  <input
    required={required || false}
    className={`form-control ${className || ''}`}
    placeholder={placeholder}
    name={name}
    {...rest}
  />
);


FormInputField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

FormInputField.defaultProps = {
  className: '',
  required: false,
};

export default FormInputField;

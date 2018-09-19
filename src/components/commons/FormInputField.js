import React from 'react';

const FormInputField = ({
  placeholder, required, name, className, ...rest
}) => (
  <input
    required={required}
    className={`form-control ${className}`}
    placeholder={placeholder}
    name={name}
    {...rest}
  />
);

export default FormInputField;

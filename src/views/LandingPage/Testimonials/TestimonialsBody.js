import React from 'react';
import PropTypes from 'prop-types';
import './Testimonials.css';

const TestimonialsBody = ({ testimonialsArray }) => (
  <div className="row">
    {testimonialsArray.map(testimonial => (
      <div key={testimonial.name} className="col-md-4 p-4">
        <img
          className="img-fluid rounded-circle testimonial"
          src={testimonial.image.default || testimonial.image}
          alt={testimonial.name}
        />
        <p className="my-4">
          <i>
            {testimonial.text}
          </i>
        </p>
        <p>
          <b>{testimonial.name}</b>
          <br />
          {testimonial.role}
        </p>
      </div>
    ))}
  </div>
);

TestimonialsBody.propTypes = {
  testimonialsArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      text: PropTypes.string,
      image: PropTypes.string,
      role: PropTypes.string,

    }),
  ).isRequired,
};

export default TestimonialsBody;

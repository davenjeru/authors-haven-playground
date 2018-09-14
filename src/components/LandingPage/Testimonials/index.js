import React from 'react';
import TestimonialsBody from './TestimonialsBody';
import TestimonialsHeader from './TestimonialsHeader';

const Testimonials = ({ testimonialsArray }) => (
  <div className="py-5 text-center bg-light">
    <div className="container">
      <TestimonialsHeader />
      <TestimonialsBody testimonialsArray={testimonialsArray} />
    </div>
  </div>
);

Testimonials.propTypes = {
  testimonialsArray: TestimonialsBody.propTypes.testimonialsArray.isRequired,
};

export default Testimonials;

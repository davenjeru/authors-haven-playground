import PropTypes from 'prop-types';
import React from 'react';

const Benefits = ({ benefitsArray }) => (
  <div className="col-md-6">
    <h4 className="text-primary">Benefits And Features</h4>
    <div className="row text-left pl-5">
      {benefitsArray.map(benefit => (
        <div key={benefit.value} className="col-md-6 my-3">
          <div className="row mb-3">
            <div className="align-self-center col-10 col-md-12">
              <h5 className="text-secondary">
                {benefit.value}
                {' '}
                {benefit.emoji}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

Benefits.propTypes = {
  benefitsArray: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    emoji: PropTypes.string,
  },
  )).isRequired,
};

export default Benefits;

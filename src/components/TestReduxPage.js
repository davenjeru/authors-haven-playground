import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '../actions/testActions';

const TestReduxPage = ({ testText, actions }) => {
  const { addTestText, removeTestText } = actions;
  return (
    <div>
      <h1>{testText}</h1>
      <button
        className="btn btn-primary"
        type="button"
        onClick={addTestText}
      >
          ADD TEST
      </button>

      <button
        className="btn btn-danger"
        type="button"
        onClick={removeTestText}
      >
          REMOVE TEST
      </button>
    </div>
  );
};

TestReduxPage.propTypes = {
  testText: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    addTestText: PropTypes.func.isRequired,
    removeTestText: PropTypes.func.isRequired,
  },
  ).isRequired,

};

const mapStateToProps = ({ test }) => (
  {
    testText: test.testText,
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators(testActions, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TestReduxPage);

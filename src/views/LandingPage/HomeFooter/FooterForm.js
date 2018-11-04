import React from 'react';

const FooterForm = () => (
  <div className="text-center">
    <h5>Ask us a question</h5>
    <form className="form-row">
      <input
        type="email"
        className="form-control col-12"
        placeholder="Enter email"
      />
      <input
        type="text"
        className="form-control col-12 mt-1"
        placeholder="Question?"
      />
      <button
        type="submit"
        className="btn btn-outline-primary mx-auto mt-1 text-white"
      >
        Submit
      </button>
    </form>
  </div>
);

export default FooterForm;

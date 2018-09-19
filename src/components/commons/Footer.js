import React from 'react';

const Footer = () => (
  <footer
    className="bg-dark text-white"
    style={{
      position: 'fixed',
      bottom: '0',
      width: '100%',
    }}
  >
    <div className="row">
      <div className="col-md-12 mt-3">
        <p className="text-center text-muted">
          © Copyright 2018 Authors Haven - All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

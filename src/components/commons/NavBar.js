import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <header>
    <nav className="navbar navbar-expand-md bg-primary fixed-top">
      <div className="container">
        <Link to="/">
          <div className="navbar-brand">
            <b className="text-white">Authors Haven</b>
          </div>
        </Link>
      </div>
    </nav>
  </header>

);

export default NavBar;

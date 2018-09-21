import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <header>
    <nav className="navbar bg-primary fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="nav-link text-white">Authors Haven</Link>
        </div>
      </div>
    </nav>
  </header>

);

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import AHLogo from '../AHLogo';
import './NavBar.css';

const NavBar = () => (
  <header>
    <nav className="navbar bg-primary fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <AHLogo className="nav-logo" />
          </Link>
        </div>
      </div>
    </nav>
  </header>

);

export default NavBar;

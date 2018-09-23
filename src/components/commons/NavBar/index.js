import React from 'react';
import { Link } from 'react-router-dom';
import AHLogo from '../AHLogo';
import './NavBar.css';
import * as routes from '../../../routes';

const NavBar = () => (
  <header>
    <nav className="navbar bg-primary fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <Link to={routes.INDEX_ROUTE}>
            <AHLogo className="nav-logo" />
          </Link>
        </div>
      </div>
    </nav>
  </header>

);

export default NavBar;

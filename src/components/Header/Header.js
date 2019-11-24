import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CharacterContext from '../../contexts/CharacterContext';
import TokenService from '../../services/token-service';
import './Header.css';

export default class Header extends Component {
  static contextType = CharacterContext;

  handleLogoutClick = () => {
    this.context.clearContext();
    TokenService.clearAuthToken();
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }

  render() {
    return (
      <>
        <nav className="Header">
          <h1>
            <Link to="/">
              <div>
                <h1>Borderland 3</h1>
                <p>Gear Tracker</p>
              </div>
            </Link>
          </h1>
          {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
        </nav>

        <span className="Header__tagline--narrow">Rate all the things.</span>
      </>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CharacterContext from '../../contexts/CharacterContext';
import TokenService from '../../services/token-service';
import bl3logo from '../../images/borderlands-3-logo.png';
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
        {this.props.location.pathname === '/' && (
          <Link className="Header__dashboard" to="/inventory">
            Inventory
          </Link>
        )}
        <Link className="link_as_btn blue_bg" onClick={this.handleLogoutClick} to="/">
          LOGOUT
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link className="link_as_btn blue_bg" to="/login">
          LOG IN
        </Link>
        <Link className="link_as_btn yellow_bg" to="/register">
          REGISTER
        </Link>
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
                <img src={bl3logo} alt="Borderlands 3 logo" />
                <p>Gear Tracker</p>
              </div>
            </Link>
          </h1>
          {TokenService.hasAuthToken() ? this.renderLogoutLink() : this.renderLoginLink()}
        </nav>

        <span className="Header__tagline">Present for you. You earned it.</span>
      </>
    );
  }
}

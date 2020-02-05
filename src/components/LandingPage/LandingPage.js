import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="LandingPage__content">
        <h1>NEVER FORGET</h1>
        <p>Keeping track of what gear you own or where it is in BL3 just got easy</p>
        <p>Just click Register above to get started or click below to try it out!</p>
        <Link className="LandingPage__demo link_as_btn blue_bg" to="/demo">
          DEMO
        </Link>
      </div>
    </div>
  );
}

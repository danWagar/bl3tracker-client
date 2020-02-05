import React, { Component } from 'react';
import trackerService from '../../services/bl3-tracker-api-service';
import WeaponRow from '../WeaponRow/WeaponRow';
import WeaponFilters from '../WeaponFilters/WeaponFilters';

export default class WeaponsTable extends Component {
  state = {
    weapons: []
  };

  componentDidMount() {
    trackerService.getWeapons().then(res => this.setState({ weapons: [...this.state.weapons, ...res] }));
  }

  setWeaponState = wpns => {
    this.setState({ weapons: wpns });
  };

  render() {
    return (
      <div className="WeaponsTable__container">
        <WeaponFilters setWeaponState={this.setWeaponState} />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Mfr.</th>
              <th>TYPE</th>
              <th>NAME</th>
            </tr>
          </thead>
          <tbody>
            {this.state.weapons.map(wpn => (
              <WeaponRow key={wpn.id} item={wpn} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

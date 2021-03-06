import React, { Component } from 'react';
import trackerService from '../../services/bl3-tracker-api-service';

export default class WeaponFilters extends Component {
  filter = {
    mfr_id: '',
    weapon_type: ''
  };

  setFilter = fltrParam => {
    this.filter = { ...this.filter, ...fltrParam };
    //if (this.filter.mfr_id || this.filter.weapon_type)
    return `mfr_id=${this.filter.mfr_id}&weapon_type=${this.filter.weapon_type}`;
    // return '';
  };

  getFilteredWeapons = qryParam => {
    if (this.props.userWeapons) {
      trackerService.getCharacterWeapons(this.setFilter(qryParam)).then(wpns => {
        return this.props.setWeaponState([...wpns]);
      });
    } else {
      trackerService.getWeapons(this.setFilter(qryParam)).then(wpns => {
        return this.props.setWeaponState([...wpns]);
      });
    }
  };

  render() {
    return (
      <>
        <span>FILTERS:</span>
        <div className="WeaponsTable__filters">
          <label htmlFor="mfr">Manufacturer</label>
          <select name="mfr" id="mfr" onChange={e => this.getFilteredWeapons({ mfr_id: e.target.value })}>
            <option value="">All</option>
            <option value="1">Atlas</option>
            <option value="2">COV</option>
            <option value="3">DAHL</option>
            <option value="4">Hyperion</option>
            <option value="5">Jakobs</option>
            <option value="6">Maliwan</option>
            <option value="7">Tediore</option>
            <option value="8">TORGUE</option>
            <option value="9">Vladof</option>
          </select>
          <label htmlFor="mfr">Type</label>
          <select
            name="mfr"
            id="mfr"
            onChange={e => this.getFilteredWeapons({ weapon_type: e.target.value })}
          >
            <option value="">All</option>
            <option value="pistol">Pistols</option>
            <option value="assault rifle">Assault Rifles</option>
            <option value="smg">SMGs</option>
            <option value="launcher">Launchers</option>
            <option value="shotgun">Shotguns</option>
            <option value="sniper">Snipers</option>
          </select>
        </div>
      </>
    );
  }
}

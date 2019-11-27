import React, { Component } from 'react';
import trackerService from '../../services/bl3-tracker-api-service';
import ShieldRow from '../ShieldRow/ShieldRow';

export default class ShieldsTable extends Component {
  state = {
    shields: []
  };

  filter = {
    mfr_id: ''
  };

  componentDidMount() {
    trackerService.getShields().then(res => {
      this.setState({ shields: [...res] });
    });
  }

  setFilter(fltrParam) {
    this.filter = { ...this.filter, ...fltrParam };
    //if (this.filter.mfr_id || this.filter.shield_type)
    return `mfr_id=${this.filter.mfr_id}`;
    // return '';
  }

  getFilteredShields(qryParam) {
    trackerService.getShields(this.setFilter(qryParam)).then(res => {
      return this.setState({ shields: [...res] });
    });
  }

  render() {

    return (
      <>
        FILTERS:
        <label htmlFor="mfr">Manufacturer</label>
        <select name="mfr" id="mfr" onChange={e => this.getFilteredShields({ mfr_id: e.target.value })}>
          <option value="">All</option>
          <option value="10">Anshin</option>
          <option value="4">Hyperion</option>
          <option value="11">Pangolin</option>
        </select>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>manufacturer</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.shields.map(shield => (
              <ShieldRow shield={shield} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

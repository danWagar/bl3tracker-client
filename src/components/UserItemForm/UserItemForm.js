import React, { Component } from 'react';
import trackerService from '../../services/bl3-tracker-api-service';

export default class UserItemForm extends Component {
  state = {
    prefixes: [],
    anointments: []
  };

  filter = {
    terror: false,
    universal: false,
    beastmaster: false,
    gunner: false,
    operative: false,
    siren: false
  };

  componentDidMount() {
    trackerService.getPrefixes(this.props.mfr_id).then(res => this.setState({ prefixes: [...res] }));
    trackerService.getAnointments().then(res => this.setState({ anointments: [...res] }));
  }

  addPrefixOptions() {
    return (
      <>
        <option value="">none</option>
        {this.state.prefixes.map(pf => (
          <option value={pf.title}>{pf.title}</option>
        ))}
      </>
    );
  }

  applyFilterToAnointments() {
    trackerService
      .getAnointments(
        this.filter.terror,
        this.filter.universal,
        this.filter.beastmaster,
        this.filter.gunner,
        this.filter.operative,
        this.filter.siren
      )
      .then(res => this.setState({ anointments: [...res] }));
  }

  addAnointmentsOptions() {
    return (
      <>
        <option value="">none</option>
        {this.state.anointments.map(anointment => (
          <option value={anointment.description}>{anointment.description}</option>
        ))}
      </>
    );
  }

  render() {
    return (
      <form className="UserItemForm">
        <label htmlFor="UserItemForm__prefix1">Prefix 1</label>
        <select name="prefix1" id="UserItemForm__prefix1">
          {this.addPrefixOptions()}
        </select>
        <label htmlFor="UserItemForm__prefix2">Prefix 2</label>
        <select name="prefix2" id="UserItemForm__prefix2">
          {this.addPrefixOptions()}
        </select>
        <label htmlFor="UserItemForm__element">Element</label>
        <select name="element" id="UserItemForm__element">
          <option value="normal">normal</option>
          <option value="fire">fire</option>
          <option value="corrosive">corrosive</option>
          <option value="shock">shock</option>
          <option value="cryo">cryo</option>
          <option value="radiation">radiation</option>
        </select>
        <span>Filter Anointments:</span>
        <div className="UserItemForm_filter">
          <label htmlFor="UserItemForm_filter_terror">Terror</label>
          <input
            type="checkbox"
            id="UserItemForm_filter_terror"
            onChange={e => {
              this.filter.terror = !this.filter.terror;
              this.applyFilterToAnointments();
            }}
          />
          <label htmlFor="UserItemForm_filter_universal">Universal</label>
          <input
            type="checkbox"
            id="UserItemForm_filter_universal"
            onChange={e => {
              this.filter.universal = !this.filter.universal;
              this.applyFilterToAnointments();
            }}
          />
          <label htmlFor="UserItemForm_filter_beastmaster">Beastmaster</label>
          <input
            type="checkbox"
            id="UserItemForm_filter_beastmaster"
            onChange={e => {
              this.filter.beastmaster = !this.filter.beastmaster;
              this.applyFilterToAnointments();
            }}
          />
          <label htmlFor="UserItemForm_filter_gunner">Gunner</label>
          <input
            type="checkbox"
            id="UserItemForm_filter_gunner"
            onChange={e => {
              this.filter.gunner = !this.filter.gunner;
              this.applyFilterToAnointments();
            }}
          />
          <label htmlFor="UserItemForm_filter_operative">Operative</label>
          <input
            type="checkbox"
            id="UserItemForm_filter_operative"
            onChange={e => {
              this.filter.operative = !this.state.operative;
              this.applyFilterToAnointments();
            }}
          />
          <label htmlFor="UserItemForm_filter_siren">Siren</label>
          <input
            type="checkbox"
            id="UserItemForm_filter_siren"
            onChange={e => {
              this.filter.siren = !this.state.siren;
              this.applyFilterToAnointments();
            }}
          />
        </div>
        <label htmlFor="UserItemForm__anointment_id">Anointment</label>
        <select name="anointment_id" id="UserItemForm__anointment_id">
          {this.addAnointmentsOptions()}
        </select>
        <label htmlFor="UserItemForm__item_score">Item Score</label>
        <input type="text" name="item_score" id="UserItemForm__item_score" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

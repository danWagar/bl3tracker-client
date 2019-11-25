import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import trackerService from '../../services/bl3-tracker-api-service';

export default class UserWeaponForm extends Component {
  static contextType = CharacterContext;

  state = {
    prefixes: [],
    anointments: []
  };

  filters = {
    terror: false,
    class: ''
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
          <option value={pf.id}>{pf.title}</option>
        ))}
      </>
    );
  }

  applyFilterToAnointments = e => {
    if (e.target.id === 'UserWeaponForm_filter_terror') this.filters.terror = !this.filters.terror;
    if (e.target.name === 'class') this.filters.class = e.target.value;
    trackerService
      .getAnointments(this.filters.terror, this.filters.class)
      .then(res => this.setState({ anointments: [...res] }));
  };

  addAnointmentsOptions() {
    return (
      <>
        <option value="">none</option>
        {this.state.anointments.map(anointment => (
          <option value={anointment.id}>{anointment.description}</option>
        ))}
      </>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      prefix_1,
      prefix_2,
      element,
      anointment_id,
      item_score,
      damage,
      accuracy,
      handling,
      reload_time,
      fire_rate,
      magazine_size
    } = e.target;

    this.context.handleSubmitWeapon({
      char_id: this.context.currentCharAddWeaponExpanded,
      weapon_id: this.props.weapon_id,
      prefix_1: prefix_1.value,
      prefix_2: prefix_2.value,
      element: element.value,
      anointment_id: anointment_id.value,
      item_score: item_score.value,
      damage: damage.value,
      accuracy: accuracy.value,
      handling: handling.value,
      reload_time: reload_time.value,
      fire_rate: fire_rate.value,
      magazine_size: magazine_size.value
    });

    this.props.toggleAddUserItem();
  };

  render() {
    return (
      <form className="UserWeaponForm" onSubmit={this.handleSubmit}>
        <label htmlFor="UserWeaponForm__prefix1">Prefix 1</label>
        <select name="prefix_1" id="UserWeaponForm__prefix1">
          {this.addPrefixOptions()}
        </select>
        <label htmlFor="UserWeaponForm__prefix2">Prefix 2</label>
        <select name="prefix_2" id="UserWeaponForm__prefix2">
          {this.addPrefixOptions()}
        </select>
        <label htmlFor="UserWeaponForm__element">Element</label>
        <select name="element" id="UserWeaponForm__element">
          <option value="normal">normal</option>
          <option value="fire">fire</option>
          <option value="corrosive">corrosive</option>
          <option value="shock">shock</option>
          <option value="cryo">cryo</option>
          <option value="radiation">radiation</option>
        </select>
        <span>Filter Anointments:</span>
        <div className="UserWeaponForm_filter">
          <label htmlFor="UserWeaponForm_filter_terror">Terror</label>
          <input type="checkbox" id="UserWeaponForm_filter_terror" onChange={this.applyFilterToAnointments} />
          <label htmlFor="UserWeaponForm_filter_universal">Universal</label>
          <input
            type="radio"
            id="UserWeaponForm_filter_universal"
            name="class"
            value="Universal"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="UserWeaponForm_filter_beastmaster">Beastmaster</label>
          <input
            type="radio"
            name="class"
            id="UserWeaponForm_filter_beastmaster"
            value="Beastmaster"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="UserWeaponForm_filter_gunner">Gunner</label>
          <input
            type="radio"
            name="class"
            id="UserWeaponForm_filter_gunner"
            value="Gunner"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="UserWeaponForm_filter_operative">Operative</label>
          <input
            type="radio"
            name="class"
            id="UserWeaponForm_filter_operative"
            value="Operative"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="UserWeaponForm_filter_siren">Siren</label>
          <input
            type="radio"
            name="class"
            id="UserWeaponForm_filter_siren"
            value="Siren"
            onChange={this.applyFilterToAnointments}
          />
        </div>
        <label htmlFor="UserWeaponForm__anointment_id">Anointment</label>
        <select name="anointment_id" id="UserWeaponForm__anointment_id">
          {this.addAnointmentsOptions()}
        </select>
        <label htmlFor="UserWeaponForm__item_score">Item Score</label>
        <input type="text" name="item_score" id="UserWeaponForm__item_score" />
        <label htmlFor="UserWeaponForm__damabe">Damage</label>
        <input type="text" name="damage" id="UserWeaponForm__damage" />
        <label htmlFor="UserWeaponForm__accuracy">accuracy</label>
        <input type="text" name="accuracy" id="UserWeaponForm__accuracy" />
        <label htmlFor="UserWeaponForm__handling">handling</label>
        <input type="text" name="handling" id="UserWeaponForm__handling" />
        <label htmlFor="UserWeaponForm__reload_time">Reload Time</label>
        <input type="text" name="reload_time" id="UserWeaponForm__reload_time" />
        <label htmlFor="UserWeaponForm__fire_rate">Fire Rate</label>
        <input type="text" name="fire_rate" id="UserWeaponForm__fire_rate" />
        <label htmlFor="UserWeaponForm__magazine_size">Magazine Size</label>
        <input type="text" name="magazine_size" id="UserWeaponForm__magazine_size" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import trackerService from '../../services/bl3-tracker-api-service';

export default class EditWeaponForm extends Component {
  static contextType = CharacterContext;

  state = {
    prefixes: [],
    anointments: [],
    selectedPrefix1: this.props.wpn.prefix_1,
    selectedPrefix2: this.props.wpn.prefix_2,
    anointment_id: this.props.wpn.anointment_id
  };

  filters = {
    terror: false,
    class: ''
  };

  componentDidMount() {
    console.log(this.props.wpn);
    trackerService.getPrefixes(this.props.wpn.mfr_id).then(res => this.setState({ prefixes: [...res] }));
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
    if (e.target.id === 'EditWeaponForm_filter_terror') this.filters.terror = !this.filters.terror;
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
          <option
            value={anointment.id}
            //selected={this.props.wpn.anointment_id === anointment.id ? true : false}
          >
            {anointment.description}
          </option>
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

    this.context.handleEditWeapon({
      id: this.props.wpn.user_weapon_id,
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

    this.props.setEditWeaponIdToNull();
  };

  render() {
    return (
      <form className="EditWeaponForm" onSubmit={this.handleSubmit}>
        <label htmlFor="EditWeaponForm__prefix1">Prefix 1</label>
        <select
          name="prefix_1"
          id="EditWeaponForm__prefix1"
          value={this.state.selectedPrefix1}
          onChange={e => this.setState({ selectedPrefix1: e.target.value })}
        >
          {this.addPrefixOptions()}
        </select>
        <label htmlFor="EditWeaponForm__prefix2">Prefix 2</label>
        <select
          name="prefix_2"
          id="EditWeaponForm__prefix2"
          value={this.state.selectedPrefix2}
          onChange={e => this.setState({ selectedPrefix2: e.target.value })}
        >
          {this.addPrefixOptions()}
        </select>
        <label htmlFor="EditWeaponForm__element">Element</label>
        <select name="element" id="EditWeaponForm__element" defaultValue={this.props.wpn.element}>
          <option value="normal">normal</option>
          <option value="fire">fire</option>
          <option value="corrosive">corrosive</option>
          <option value="shock">shock</option>
          <option value="cryo">cryo</option>
          <option value="radiation">radiation</option>
        </select>
        <span>Filter Anointments:</span>
        <div className="EditWeaponForm_filter">
          <label htmlFor="EditWeaponForm_filter_terror">Terror</label>
          <input type="checkbox" id="EditWeaponForm_filter_terror" onChange={this.applyFilterToAnointments} />
          <label htmlFor="EditWeaponForm_filter_universal">Universal</label>
          <input
            type="radio"
            id="EditWeaponForm_filter_universal"
            name="class"
            value="Universal"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="EditWeaponForm_filter_beastmaster">Beastmaster</label>
          <input
            type="radio"
            name="class"
            id="EditWeaponForm_filter_beastmaster"
            value="Beastmaster"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="EditWeaponForm_filter_gunner">Gunner</label>
          <input
            type="radio"
            name="class"
            id="EditWeaponForm_filter_gunner"
            value="Gunner"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="EditWeaponForm_filter_operative">Operative</label>
          <input
            type="radio"
            name="class"
            id="EditWeaponForm_filter_operative"
            value="Operative"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="EditWeaponForm_filter_siren">Siren</label>
          <input
            type="radio"
            name="class"
            id="EditWeaponForm_filter_siren"
            value="Siren"
            onChange={this.applyFilterToAnointments}
          />
        </div>
        <label htmlFor="EditWeaponForm__anointment_id">Anointment</label>
        <select
          name="anointment_id"
          id="EditWeaponForm__anointment_id"
          value={this.state.anointment_id}
          onChange={e => this.setState({ anointment_id: e.target.value })}
        >
          {this.addAnointmentsOptions()}
        </select>
        <label htmlFor="EditWeaponForm__item_score">Item Score</label>
        <input
          type="text"
          name="item_score"
          id="EditWeaponForm__item_score"
          defaultValue={this.props.wpn.item_score}
        />
        <label htmlFor="EditWeaponForm__damabe">Damage</label>
        <input type="text" name="damage" id="EditWeaponForm__damage" defaultValue={this.props.wpn.damage} />
        <label htmlFor="EditWeaponForm__accuracy">accuracy</label>
        <input
          type="text"
          name="accuracy"
          id="EditWeaponForm__accuracy"
          defaultValue={this.props.wpn.accuracy}
        />
        <label htmlFor="EditWeaponForm__handling">handling</label>
        <input
          type="text"
          name="handling"
          id="EditWeaponForm__handling"
          defaultValue={this.props.wpn.handling}
        />
        <label htmlFor="EditWeaponForm__reload_time">Reload Time</label>
        <input
          type="text"
          name="reload_time"
          id="EditWeaponForm__reload_time"
          defaultValue={this.props.wpn.reload_time}
        />
        <label htmlFor="EditWeaponForm__fire_rate">Fire Rate</label>
        <input
          type="text"
          name="fire_rate"
          id="EditWeaponForm__fire_rate"
          defaultValue={this.props.wpn.fire_rate}
        />
        <label htmlFor="EditWeaponForm__magazine_size">Magazine Size</label>
        <input
          type="text"
          name="magazine_size"
          id="EditWeaponForm__magazine_size"
          defaultValue={this.props.wpn.magazine_size}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

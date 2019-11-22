import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import trackerService from '../../services/bl3-tracker-api-service';

export default class UserItemForm extends Component {
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
    console.log(this.state.prefixes);
    return (
      <>
        <option value="">none</option>
        {this.state.prefixes.map(pf => (
          <option value={pf.mfr_id}>{pf.title}</option>
        ))}
      </>
    );
  }

  applyFilterToAnointments = e => {
    if (e.target.id === 'UserItemForm_filter_terror') this.filters.terror = !this.filters.terror;
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
      char_id: this.context.currentCharAddListExpanded,
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

  /*
  

  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  char_id INTEGER REFERENCES user_characters(id) ON DELETE SET NULL,
  weapon_id INTEGER REFERENCES weapons(id) ON DELETE CASCADE NOT NULL,
  prefix_1 INTEGER REFERENCES prefixes(id) ON DELETE SET NULL,
  prefix_2 INTEGER REFERENCES prefixes(id) ON DELETE SET NULL,
  element elmnt,
  anointment_id INTEGER REFERENCES anointments(id) ON DELETE SET NULL,
  item_score INTEGER, CHECK(item_score <= 621),
  damage VARCHAR(6),
  accuracy INTEGER, CHECK(accuracy <= 100),
  handling INTEGER, CHECK(handling <= 100),
  reload_time DECIMAL(3,1),
  fire_rate DECIMAL(4,2),
  magazine_size INTEGER, CHECK(magazine_size <= 999)
  */
  render() {
    return (
      <form className="UserItemForm" onSubmit={this.handleSubmit}>
        <label htmlFor="UserItemForm__prefix1">Prefix 1</label>
        <select name="prefix_1" id="UserItemForm__prefix1">
          {this.addPrefixOptions()}
        </select>
        <label htmlFor="UserItemForm__prefix2">Prefix 2</label>
        <select name="prefix_2" id="UserItemForm__prefix2">
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
          <input type="checkbox" id="UserItemForm_filter_terror" onChange={this.applyFilterToAnointments} />
          <label htmlFor="UserItemForm_filter_universal">Universal</label>
          <input
            type="radio"
            id="UserItemForm_filter_universal"
            name="class"
            value="Universal"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="UserItemForm_filter_beastmaster">Beastmaster</label>
          <input
            type="radio"
            name="class"
            id="UserItemForm_filter_beastmaster"
            value="Beastmaster"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="UserItemForm_filter_gunner">Gunner</label>
          <input
            type="radio"
            name="class"
            id="UserItemForm_filter_gunner"
            value="Gunner"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="UserItemForm_filter_operative">Operative</label>
          <input
            type="radio"
            name="class"
            id="UserItemForm_filter_operative"
            value="Operative"
            onChange={this.applyFilterToAnointments}
          />
          <label htmlFor="UserItemForm_filter_siren">Siren</label>
          <input
            type="radio"
            name="class"
            id="UserItemForm_filter_siren"
            value="Siren"
            onChange={this.applyFilterToAnointments}
          />
        </div>
        <label htmlFor="UserItemForm__anointment_id">Anointment</label>
        <select name="anointment_id" id="UserItemForm__anointment_id">
          {this.addAnointmentsOptions()}
        </select>
        <label htmlFor="UserItemForm__item_score">Item Score</label>
        <input type="text" name="item_score" id="UserItemForm__item_score" />
        <label htmlFor="UserItemForm__damabe">Damage</label>
        <input type="text" name="damage" id="UserItemForm__damage" />
        <label htmlFor="UserItemForm__accuracy">accuracy</label>
        <input type="text" name="accuracy" id="UserItemForm__accuracy" />
        <label htmlFor="UserItemForm__handling">handling</label>
        <input type="text" name="handling" id="UserItemForm__handling" />
        <label htmlFor="UserItemForm__reload_time">Reload Time</label>
        <input type="text" name="reload_time" id="UserItemForm__reload_time" />
        <label htmlFor="UserItemForm__fire_rate">Fire Rate</label>
        <input type="text" name="fire_rate" id="UserItemForm__fire_rate" />
        <label htmlFor="UserItemForm__magazine_size">Magazine Size</label>
        <input type="text" name="magazine_size" id="UserItemForm__magazine_size" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

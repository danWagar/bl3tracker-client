import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import trackerService from '../../services/bl3-tracker-api-service';

export default class UserShieldForm extends Component {
  static contextType = CharacterContext;

  state = {
    prefixes: [
      'Absorb',
      'Adaptive',
      'Adrenaline',
      'Amp',
      'Booster',
      'Brimming',
      'Delay',
      'Fallout',
      'Fleet',
      'Fortify Charge',
      'Health',
      'Health Charge',
      'Nova',
      'Power Charge',
      'Projected',
      'Ratch',
      'Recharge',
      'Reflect',
      'Resistant',
      'Roid',
      'Run-and-Gun',
      'Safe-Space',
      'Spike',
      'Sucker',
      'Trigger Happy',
      'Turtle',
      'Vagabond'
    ],
    anointments: []
  };

  componentDidMount() {
    trackerService.getAnointments().then(res => this.setState({ anointments: [...res] }));
  }

  addPrefixOptions() {
    return (
      <>
        <option value="">none</option>
        {this.state.prefixes.map(pf => (
          <option value={pf}>{pf}</option>
        ))}
      </>
    );
  }

  applyFilterToAnointments = e => {
    if (e.target.id === 'UserShieldForm_filter_terror') this.filters.terror = !this.filters.terror;
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
    const { prefix, element, anointment_id, item_score, capacity, recharge_delay, recharge_rate } = e.target;

    this.context.handleSubmitShield({
      char_id: this.context.currentCharAddShieldExpanded,
      shield_id: this.props.shield_id,
      prefix: prefix.value,
      element: element.value,
      anointment_id: null,
      item_score: item_score.value,
      capacity: capacity.value,
      recharge_delay: recharge_delay.value,
      recharge_rate: recharge_rate.value
    });

    this.props.toggleAddUserItem();
  };

  render() {
    return (
      <form className="UserShieldForm" onSubmit={this.handleSubmit}>
        <label htmlFor="UserShieldForm__prefix">Prefix</label>
        <select name="prefix" id="UserShieldForm__prefix">
          {this.addPrefixOptions()}
        </select>
        <label htmlFor="UserShieldForm__element">Element</label>
        <select name="element" id="UserShieldForm__element">
          <option value="normal">normal</option>
          <option value="fire">fire</option>
          <option value="corrosive">corrosive</option>
          <option value="shock">shock</option>
          <option value="cryo">cryo</option>
          <option value="radiation">radiation</option>
        </select>
        <label htmlFor="UserShieldForm__item_score">Item Score</label>
        <input type="text" name="item_score" id="UserShieldForm__item_score" />
        <label htmlFor="UserShieldForm__capacity">Capacity</label>
        <input type="text" name="capacity" id="UserShieldForm__capacity" />
        <label htmlFor="UserShieldForm__recharge_delay">Recharge Delay</label>
        <input type="text" name="recharge_delay" id="UserShieldForm__accuracy" />
        <label htmlFor="UserShieldForm__recharge_rate">Recharge Rate</label>
        <input type="text" name="recharge_rate" id="UserShieldForm__recharge_rate" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

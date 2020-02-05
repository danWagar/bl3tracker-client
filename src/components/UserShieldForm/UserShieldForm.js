import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import trackerService from '../../services/bl3-tracker-api-service';
import CustomSelect from '../CustomSelect/CustomSelect';

export default class UserShieldForm extends Component {
  static contextType = CharacterContext;

  state = {
    prefixes: [
      { id: 'Absorb', text: 'Absorb' },
      { id: 'Adaptive', text: 'Adaptive' },
      { id: 'Adrenaline', text: 'Adrenaline' },
      { id: 'Amp', text: 'Amp' },
      { id: 'Booster', text: 'Booster' },
      { id: 'Brimming', text: 'Brimming' },
      { id: 'Delay', text: 'Delay' },
      { id: 'Fallout', text: 'Fallout' },
      { id: 'Fleet', text: 'Fleet' },
      { id: 'Fortify Charge', text: 'Fortify Charge' },
      { id: 'Health', text: 'Health' },
      { id: 'Health Charge', text: 'Health Charge' },
      { id: 'Nova', text: 'Nova' },
      { id: 'Power Charge', text: 'Power Charge' },
      { id: 'Projected', text: 'Projected' },
      { id: 'Ratch', text: 'Ratch' },
      { id: 'Recharge', text: 'Recharge' },
      { id: 'Reflect', text: 'Reflect' },
      { id: 'Resistant', text: 'Resistant' },
      { id: 'Roid', text: 'Roid' },
      { id: 'Run-and-Gun', text: 'Run-and-Gun' },
      { id: 'Safe-Space', text: 'Safe-Space' },
      { id: 'Spike', text: 'Spike' },
      { id: 'Sucker', text: 'Sucker' },
      { id: 'Trigger Happy', text: 'Trigger Happy' },
      { id: 'Turtle', text: 'Turtle' },
      { id: 'Vagabond', text: 'Vagabond' }
    ],
    prefixId: null,
    element: 'normal',
    anointments: [],
    anointmentId: null
  };

  filters = {
    terror: false,
    class: ''
  };

  componentDidMount() {
    if (!this.props.edit) {
      //trackerService.getPrefixes(this.props.mfr_id).then(res => this.initPrefixes(res));
      trackerService.getAnointments().then(res => this.initAnointments(res));
    } else {
      trackerService
        .getPrefixes(this.props.wpn.mfr_id)
        .then(res => this.initPrefixes(res))
        .then(() => {
          this.setStatePrefix1(this.props.wpn.prefix_1);
          this.setStatePrefix2(this.props.wpn.prefix_2);
        });
      trackerService
        .getAnointments()
        .then(res => this.initAnointments(res))
        .then(() => {
          this.setStateAnointmentId(this.props.wpn.anointment_id);
        });
      this.setStateElement(this.props.wpn.element);
    }
  }

  initAnointments(anointments) {
    this.setState({
      anointments: anointments.map(anointment => ({ id: anointment.id, text: anointment.description }))
    });
  }

  setStatePrefix = val => {
    this.setState({ prefixId: val });
  };

  setStateElement = val => {
    this.setState({ element: val });
  };

  setStateAnointmentId = val => {
    this.setState({ anointmentId: val });
  };

  getPrefixText = () => {
    let pf;
    if (this.state.prefixId) pf = this.state.prefixes.find(pf => pf.id === this.state.prefixId);
    else return '';
    return pf.text;
  };

  applyFilterToAnointments = e => {
    if (e.target.id === 'UserWeaponForm_filter_terror') this.filters.terror = !this.filters.terror;
    if (e.target.name === 'class') this.filters.class = e.target.value;
    trackerService
      .getAnointments(this.filters.terror, this.filters.class)
      .then(res => this.initAnointments(res));
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

  getAnointmentText = () => {
    if (this.state.anointmentId)
      return this.state.anointments.find(a => a.id === this.state.anointmentId).text;
    else return '';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { item_score, capacity, recharge_delay, recharge_rate } = e.target;

    this.context.handleSubmitShield({
      char_id: this.context.currentCharAddShieldExpanded,
      shield_id: this.props.shield_id,
      prefix: this.state.prefixId,
      element: this.state.element,
      anointment_id: this.state.anointmentId,
      item_score: item_score.value,
      capacity: capacity.value,
      recharge_delay: recharge_delay.value,
      recharge_rate: recharge_rate.value
    });

    this.props.toggleAddUserItem();
    this.context.addShieldClickEvent(this.context.currentCharAddShieldExpanded);
  };

  render() {
    return (
      <form className="UserWeaponForm" onSubmit={this.handleSubmit}>
        <label htmlFor="UserShieldForm__prefix">Prefix</label>
        <CustomSelect
          options={this.state.prefixes}
          headerText={this.getPrefixText()}
          setValue={this.setStatePrefix}
        />
        <label htmlFor="UserShieldForm__element">Element</label>
        <CustomSelect
          options={[
            { id: 'normal', text: 'normal' },
            { id: 'fire', text: 'fire' },
            { id: 'corrosive', text: 'corrosive' },
            { id: 'shock', text: 'shock' },
            { id: 'cryo', text: 'cryo' },
            { id: 'radiation', text: 'radiation' }
          ]}
          headerText={this.state.element}
          setValue={this.setStateElement}
        />
        <span className="UserWeaponForm__filter_header">Filter Anointments:</span>
        <div className="UserWeaponForm__filter">
          <div className="UserWeaponForm__filter__event">
            <legend>Special:</legend>
            <label htmlFor="UserWeaponForm_filter_terror">Terror</label>
            <input
              type="checkbox"
              id="UserWeaponForm_filter_terror"
              onChange={this.applyFilterToAnointments}
            />
          </div>
          <legend>Class:</legend>
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
        <label htmlFor="UserShieldForm__anointment">Anointment</label>
        <CustomSelect
          options={this.state.anointments}
          headerText={this.getAnointmentText()}
          setValue={this.setStateAnointmentId}
        />
        <label htmlFor="UserShieldForm__item_score">Item Score</label>
        <input type="text" name="item_score" id="UserShieldForm__item_score" />
        <label htmlFor="UserShieldForm__capacity">Capacity</label>
        <input type="text" name="capacity" id="UserShieldForm__capacity" />
        <label htmlFor="UserShieldForm__recharge_delay">Recharge Delay</label>
        <input type="text" name="recharge_delay" id="UserShieldForm__accuracy" />
        <label htmlFor="UserShieldForm__recharge_rate">Recharge Rate</label>
        <input type="text" name="recharge_rate" id="UserShieldForm__recharge_rate" />
        <div className="UserWeaponForm__buttons">
          <button className="blue_bg" type="submit">
            SUBMIT
          </button>
          <button className="blue_bg" onClick={this.props.toggleAddUserItem}>
            CANCEL
          </button>
        </div>
      </form>
    );
  }
}

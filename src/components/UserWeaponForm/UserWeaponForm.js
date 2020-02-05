import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import trackerService from '../../services/bl3-tracker-api-service';
import CustomSelect from '../CustomSelect/CustomSelect';

export default class UserWeaponForm extends Component {
  static contextType = CharacterContext;

  state = {
    prefixes: [],
    anointments: [],
    prefixIdFirst: null,
    prefixIdSecond: null,
    element: 'normal',
    anointmentId: null
  };

  filters = {
    terror: false,
    class: ''
  };

  componentDidMount() {
    if (!this.props.edit) {
      trackerService.getPrefixes(this.props.mfr_id).then(res => this.initPrefixes(res));
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

  initPrefixes(prefixes) {
    this.setState({ prefixes: prefixes.map(prefix => ({ id: prefix.id, text: prefix.title })) });
  }

  initAnointments(anointments) {
    this.setState({
      anointments: anointments.map(anointment => ({ id: anointment.id, text: anointment.description }))
    });
  }

  setStatePrefix1 = val => {
    this.setState({ prefixIdFirst: val });
  };

  setStatePrefix2 = val => {
    this.setState({ prefixIdSecond: val });
  };

  setStateElement = val => {
    this.setState({ element: val });
  };

  setStateAnointmentId = val => {
    this.setState({ anointmentId: val });
  };

  getFirstPrefixText = () => {
    let pf;
    if (this.state.prefixIdFirst) pf = this.state.prefixes.find(pf => pf.id === this.state.prefixIdFirst);
    else return '';
    return pf.text;
  };

  getSecondPrefixText = () => {
    let pf;
    if (this.state.prefixIdSecond) pf = this.state.prefixes.find(pf => pf.id === this.state.prefixIdSecond);
    else return '';
    return pf.text;
  };

  getAnointmentText = () => {
    if (this.state.anointmentId)
      return this.state.anointments.find(a => a.id === this.state.anointmentId).text;
    else return '';
    //return anointment.text;
  };

  applyFilterToAnointments = e => {
    if (e.target.id === 'UserWeaponForm_filter_terror') this.filters.terror = !this.filters.terror;
    if (e.target.name === 'class') this.filters.class = e.target.value;
    trackerService
      .getAnointments(this.filters.terror, this.filters.class)
      .then(res => this.initAnointments(res));
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { item_score, damage, accuracy, handling, reload_time, fire_rate, magazine_size } = e.target;

    const weaponStats = {
      prefix_1: this.state.prefixIdFirst,
      prefix_2: this.state.prefixIdSecond,
      element: this.state.element,
      anointment_id: this.state.anointmentId,
      item_score: item_score.value,
      damage: damage.value,
      accuracy: accuracy.value,
      handling: handling.value,
      reload_time: reload_time.value,
      fire_rate: fire_rate.value,
      magazine_size: magazine_size.value
    };

    if (this.props.edit) {
      const editedWpn = {
        id: this.props.wpn.user_weapon_id,
        ...weaponStats
      };
      await this.context.handleEditWeapon(editedWpn);
    } else {
      const newWpn = {
        char_id: this.context.currentCharAddWeaponExpanded,
        weapon_id: this.props.weapon_id,
        ...weaponStats
      };
      await this.context.handleSubmitWeapon(newWpn);
    }

    this.props.toggleAddUserItem();
    this.context.addWeaponClickEvent(this.context.currentCharAddWeaponExpanded);
  };

  render() {
    let edit = false;
    let wpn;
    if (this.props.edit) {
      edit = true;
      wpn = this.props.wpn;
    }
    return (
      <form className="UserWeaponForm" onSubmit={this.handleSubmit}>
        <label htmlFor="UserWeaponForm__prefix1">Prefix 1</label>
        <CustomSelect
          options={this.state.prefixes}
          headerText={this.getFirstPrefixText()}
          setValue={this.setStatePrefix1}
        />
        <label htmlFor="UserWeaponForm__prefix2">Prefix 2</label>
        <CustomSelect
          className="UserWeaponForm__select"
          options={this.state.prefixes}
          headerText={this.getSecondPrefixText()}
          setValue={this.setStatePrefix2}
        />
        <label htmlFor="UserWeaponForm__element">Element</label>
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
        <label htmlFor="UserWeaponForm__anointment_id">Anointment</label>
        <CustomSelect
          options={this.state.anointments}
          headerText={this.getAnointmentText()}
          setValue={this.setStateAnointmentId}
        />
        <label htmlFor="UserWeaponForm__item_score">Item Score</label>
        <input
          type="text"
          name="item_score"
          id="UserWeaponForm__item_score"
          defaultValue={edit ? wpn.item_score : ''}
        />
        <label htmlFor="UserWeaponForm__damabe">Damage</label>
        <input type="text" name="damage" id="UserWeaponForm__damage" defaultValue={edit ? wpn.damage : ''} />
        <label htmlFor="UserWeaponForm__accuracy">accuracy</label>
        <input
          type="text"
          name="accuracy"
          id="UserWeaponForm__accuracy"
          defaultValue={edit ? wpn.accuracy : ''}
        />
        <label htmlFor="UserWeaponForm__handling">handling</label>
        <input
          type="text"
          name="handling"
          id="UserWeaponForm__handling"
          defaultValue={edit ? wpn.handling : ''}
        />
        <label htmlFor="UserWeaponForm__reload_time">Reload Time</label>
        <input
          type="text"
          name="reload_time"
          id="UserWeaponForm__reload_time"
          defaultValue={edit ? wpn.reload_time : ''}
        />
        <label htmlFor="UserWeaponForm__fire_rate">Fire Rate</label>
        <input
          type="text"
          name="fire_rate"
          id="UserWeaponForm__fire_rate"
          defaultValue={edit ? wpn.fire_rate : ''}
        />
        <label htmlFor="UserWeaponForm__magazine_size">Magazine Size</label>
        <input
          type="text"
          name="magazine_size"
          id="UserWeaponForm__magazine_size"
          defaultValue={edit ? wpn.magazine_size : ''}
        />
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

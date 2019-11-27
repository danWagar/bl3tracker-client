import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import EditWeaponForm from '../EditWeaponForm/EditWeaponForm';
import StyleIcon from '../StyleIcon/StyleIcon';

export default class Weapon extends Component {
  static contextType = CharacterContext;
  state = { expand: false, wpnId: null };

  editClickEvent = e => {
    let wpnId = Number(e.target.value);
    if (this.state.wpnId === wpnId) wpnId = null;
    this.setState({ wpnId: wpnId });
  };

  setEditWeaponIdToNull = () => {
    this.setState({ wpnId: null });
  };

  getCharAsOption = (char, wpn) => {
    return (
      <option
        value={JSON.stringify({
          currentChar: this.props.charId,
          moveToCharId: char.id,
          userWeaponId: wpn.user_weapon_id
        })}
      >
        {char.character_name}
      </option>
    );
  };

  handleExpand = () => {
    this.setState({ expand: !this.state.expand });
  };

  handleDeleteClick = e => {
    this.context.handleDeleteWeapon(e);
    this.handleExpand();
  };

  render() {
    const { characters, handleMoveWeapon } = this.context;
    const wpn = this.props.wpn;
    return (
      <li className="Weapon__li">
        <div className="Weapon__card">
          <div className="Weapon__head" onClick={this.handleExpand}>
            {StyleIcon({ style: `${this.state.expand ? 'expand' : 'collapse'}` })}
            <span className={`Weapon__title ${wpn.rarity}`}>
              <span>{wpn.item_score}</span> {wpn.pre_title_1} {wpn.pre_title_2} {wpn.name}
            </span>
            {StyleIcon({ style: wpn.element })}
          </div>
          {this.state.expand && (
            <div className="Weapon__details">
              <ul className="Weapon__stats">
                <li>DAMAGE: {wpn.damage}</li>
                <li>ACCURACY: {wpn.accuracy}%</li>
                <li>HANDLING: {wpn.handling}%</li>
                <li>RELOAD: {wpn.reload_time}s</li>
                <li>FIRE RATE: {wpn.fire_rate}/s</li>
                <li>MAGAZINE SIZE: {wpn.magazine_size}</li>
              </ul>
              <div className="Weapon__actions">
                <div>
                  <label htmlFor="moveWeapon">Move To:</label>
                  <select id="moveWeapon" onChange={handleMoveWeapon}>
                    <option></option>
                    {characters.map(char => this.getCharAsOption(char, wpn))}
                  </select>
                </div>
                <button className="blue_bg" value={wpn.user_weapon_id} onClick={this.editClickEvent}>
                  EDIT
                </button>
                <button className="blue_bg" value={wpn.user_weapon_id} onClick={this.handleDeleteClick}>
                  DELETE
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {this.state.wpnId === wpn.user_weapon_id && (
            <EditWeaponForm wpn={wpn} setEditWeaponIdToNull={this.setEditWeaponIdToNull} />
          )}
        </div>
      </li>
    );
  }
}

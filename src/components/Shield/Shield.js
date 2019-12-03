import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import StyleIcon from '../StyleIcon/StyleIcon';
import UserShieldForm from '../UserShieldForm/UserShieldForm';

export default class Shield extends Component {
  static contextType = CharacterContext;

  state = { expand: false, shieldId: null };

  editClickEvent = e => {
    let shieldId = Number(e.target.value);
    if (this.state.shieldId === shieldId) shieldId = null;
    this.setState({ shieldId: shieldId });
  };

  setEditShieldIdToNull = () => {
    this.setState({ shieldId: null });
  };

  getCharAsOption = (char, shield) => {
    return (
      <option
        value={JSON.stringify({
          currentChar: this.props.charId,
          moveToCharId: char.id,
          userShieldId: shield.user_shield_id
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
    this.context.handleDeleteShield(e);
    this.handleExpand();
  };

  render() {
    const { characters, handleMoveShield } = this.context;
    const shield = this.props.shield;
    return (
      <li className="Weapon__li">
        <div className="Weapon__card">
          <div className="Weapon__head" onClick={this.handleExpand}>
            {StyleIcon({ style: `${this.state.expand ? 'expand' : 'collapse'}` })}
            <span className={`Weapon__title ${shield.rarity}`}>
              <span>{shield.item_score}</span> {shield.prefix} {shield.name}
            </span>
            {StyleIcon({ style: shield.element })}
          </div>
          {this.state.expand && (
            <div className="Weapon__details">
              <ul className="Weapon__stats">
                <li>CAPACITY: {shield.capacity}</li>
                <li>RECHARGE DELAY: {shield.recharge_delay}s</li>
                <li>RECHARGE RATE: {shield.recharge_rate}s</li>
              </ul>
              <div className="Weapon__actions">
                <label htmlFor="moveShield">Move To:</label>
                <select id="moveShield" onChange={handleMoveShield}>
                  <option></option>
                  {characters.map(char => {
                    if (char.id === this.props.charId) return '';
                    return this.getCharAsOption(char, shield);
                  })}
                </select>
                <button className="blue_bg" value={shield.user_shield_id} onClick={this.editClickEvent}>
                  EDIT
                </button>
                <button className="blue_bg" value={shield.user_shield_id} onClick={this.handleDeleteClick}>
                  DELETE
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {this.state.shieldId === shield.user_shield_id && (
            <UserShieldForm shield={shield} setEditShieldIdToNull={this.setEditWeaponIdToNull} />
          )}
        </div>
      </li>
    );
  }
}

/*
      <li>
        {shield.prefix} {shield.name}
        <label htmlFor="moveShield">Move To:</label>
        <select id="moveShield" onChange={handleMoveShield}>
          <option></option>
          {characters.map(char => this.getCharAsOption(char, shield))}
        </select>
        <button value={shield.user_shield_id} onClick={handleDeleteShield}>
          delete
        </button>
      </li>
    );
  }
}
*/

import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';

export default class Shields extends Component {
  static contextType = CharacterContext;

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

  render() {
    const { characters, handleMoveShield, handleDeleteShield } = this.context;
    const character = characters.find(char => {
      return char.id === this.props.charId;
    });
    const shields = character.shields;
    return (
      <ul>
        <h3>Shields</h3>
        {shields.map(shield => {
          return (
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
        })}
      </ul>
    );
  }
}

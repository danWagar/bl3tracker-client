import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';

export default class Weapons extends Component {
  static contextType = CharacterContext;

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

  render() {
    const { characters, handleMoveWeapon, handleDeleteWeapon } = this.context;
    const character = characters.find(char => {
      return char.id === this.props.charId;
    });
    const weapons = character.weapons;
    return (
      <ul>
        <h3>Weapons</h3>
        {weapons.map(wpn => {
          return (
            <li>
              {wpn.pre_title_1} {wpn.pre_title_2} {wpn.name} dmg: {wpn.damage} acc: {wpn.accuracy}% hnd:{' '}
              {wpn.handling}% rld: {wpn.reload_time}s fr: {wpn.fire_rate}/s mag: {wpn.magazine_size}
              <label htmlFor="moveWeapon">Move To:</label>
              <select id="moveWeapon" onChange={handleMoveWeapon}>
                <option></option>
                {characters.map(char => this.getCharAsOption(char, wpn))}
              </select>
              <button value={wpn.user_weapon_id} onClick={handleDeleteWeapon}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

/*
        'mfr_name',
        'weapon_type',
        'name',
        'rarity',
        'p1.title as pre_title_1',
        'p2.title as pre_title_2',
        'element',
        'description as anointment',
        'item_score',
        'damage',
        'accuracy',
        'handling',
        'reload_time',
        'fire_rate',
        'magazine_size'
        */

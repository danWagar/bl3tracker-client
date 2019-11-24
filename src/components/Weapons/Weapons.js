import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';

export default class Weapons extends Component {
  static contextType = CharacterContext;
  render() {
    const { characters } = this.context;
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

import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';

export default class Shields extends Component {
  static contextType = CharacterContext;

  render() {
    const { characters } = this.context;
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
            </li>
          );
        })}
      </ul>
    );
  }
}

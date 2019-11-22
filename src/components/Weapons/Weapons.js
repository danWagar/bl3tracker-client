import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';

export default class Weapons extends Component {
  static contextType = CharacterContext;
  render() {
    const { characters } = this.context;
    console.log(characters[0].inventory);
    const character = characters.find(char => char.id === this.props.charId);
    console.log(character);
    const weapons = character.inventory;
    console.log(character.inventory);
    return (
      <ul>
        <li>Testing</li>
      </ul>
    );
  }
}

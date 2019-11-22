import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import Weapons from '../Weapons/Weapons';
import Items from '../Items/Items';

export default class Characters extends Component {
  static contextType = CharacterContext;

  render() {
    const { characters = [], currentCharAddListExpanded, addInventoryClickEvent } = this.context;
    console.log(characters[0].inventory);
    return characters.map(char => (
      <div>
        <h2>{char.character_name}</h2>
        <Weapons charId={char.id} />
        <button onClick={() => addInventoryClickEvent(char.id)}>Add Items</button>
        {console.log(char.id, currentCharAddListExpanded)}
        {currentCharAddListExpanded === char.id ? <Items /> : ''}
      </div>
    ));
  }
}

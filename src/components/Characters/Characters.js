import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import Weapons from '../Weapons/Weapons';
import WeaponsTable from '../WeaponsTable/WeaponsTable';
import ShieldsTable from '../ShieldsTable/ShieldsTable';

export default class Characters extends Component {
  static contextType = CharacterContext;

  render() {
    const {
      characters = [],
      currentCharAddWeaponExpanded,
      currentCharAddShieldExpanded,
      addWeaponClickEvent,
      addShieldClickEvent
    } = this.context;
    console.log(currentCharAddShieldExpanded);
    return characters.map(char => (
      <div>
        <h2>{char.character_name}</h2>
        <Weapons charId={char.id} />
        <button onClick={() => addWeaponClickEvent(char.id)}>Add Weapons</button>
        {currentCharAddWeaponExpanded === char.id ? <WeaponsTable /> : ''}
        <button onClick={() => addShieldClickEvent(char.id)}>Add Shields</button>
        {currentCharAddShieldExpanded === char.id ? <ShieldsTable /> : ''}
      </div>
    ));
  }
}

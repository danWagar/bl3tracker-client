import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import Weapons from '../Weapons/Weapons';
import Shields from '../Shields/Shields';
import WeaponsTable from '../WeaponsTable/WeaponsTable';
import ShieldsTable from '../ShieldsTable/ShieldsTable';

export default class Characters extends Component {
  static contextType = CharacterContext;

  state = { editNameCharId: null };

  setEditNameCharId = e => {
    let id = Number(e.target.value);
    if (id === this.state.editNameCharId) id = null;
    this.setState({ editNameCharId: id });
  };

  getEditNameForm(char_id) {
    return (
      <form onSubmit={e => this.context.handleSubmitEditCharacter(char_id, e)}>
        <label htmlFor="editCharName">Name</label>
        <input type="text" id="editCharName" name="name" />
      </form>
    );
  }

  render() {
    const {
      characters = [],
      currentCharAddWeaponExpanded,
      currentCharAddShieldExpanded,
      addWeaponClickEvent,
      addShieldClickEvent,
      handleDeleteCharacter
    } = this.context;
    return characters.map(char => (
      <div>
        <h2>{char.character_name}</h2>
        {char.id !== 0 && (
          <>
            <button value={char.id} onClick={this.setEditNameCharId}>
              Edit Name
            </button>
            <button value={char.id} onClick={handleDeleteCharacter}>
              Delete
            </button>
          </>
        )}
        {this.state.editNameCharId === char.id && this.getEditNameForm(char.id)}
        <Weapons charId={char.id} />
        <Shields charId={char.id} />
        <button onClick={() => addWeaponClickEvent(char.id)}>Add Weapons</button>
        {currentCharAddWeaponExpanded === char.id ? <WeaponsTable /> : ''}
        <button onClick={() => addShieldClickEvent(char.id)}>Add Shields</button>
        {currentCharAddShieldExpanded === char.id ? <ShieldsTable /> : ''}
      </div>
    ));
  }
}

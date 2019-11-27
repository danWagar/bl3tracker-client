import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import StyleIcon from '../StyleIcon/StyleIcon';
import Weapons from '../Weapons/Weapons';
import Shields from '../Shields/Shields';
import FL4K from '../../images/fl4k.webp';

export default class Character extends Component {
  static contextType = CharacterContext;

  state = { editNameCharId: null, expand: false };

  componentDidMount() {
    if (this.props.char.character === 'Bank') this.setState({ expand: true });
  }

  setEditNameCharId = e => {
    let id = Number(e.target.value);
    if (id === this.state.editNameCharId) id = null;
    this.setState({ editNameCharId: id });
  };

  getEditNameForm(char_id) {
    this.setState({ editNameCharId: null });
    return (
      <form onSubmit={e => this.context.handleSubmitEditCharacter(char_id, e)}>
        <label htmlFor="editCharName">Name</label>
        <input type="text" id="editCharName" name="name" />
      </form>
    );
  }

  render() {
    const { bankId, handleDeleteCharacter } = this.context;
    const char = this.props.char;
    const expandIcon = StyleIcon({ style: `${this.state.expand ? 'expandBig' : 'collapseBig'}` });
    console.log(bankId);
    return (
      <div className={`Character__container ${char.character}`}>
        <div className="Character__head" onClick={() => this.setState({ expand: !this.state.expand })}>
          {expandIcon}
          <h2>{char.character_name}</h2>
          {expandIcon}
        </div>
        <div className="Character__action">
          {char.id !== bankId && (
            <>
              <button className="blue_bg" value={char.id} onClick={this.setEditNameCharId}>
                EDIT NAME
              </button>
              <button className="blue_bg" value={char.id} onClick={handleDeleteCharacter}>
                DELETE
              </button>
            </>
          )}
        </div>
        {this.state.editNameCharId === char.id && this.getEditNameForm(char.id)}
        {this.state.expand && (
          <>
            <Weapons charId={char.id} />
            <Shields charId={char.id} />
          </>
        )}
      </div>
    );
  }
}

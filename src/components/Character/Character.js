import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import StyleIcon from '../StyleIcon/StyleIcon';
import Weapons from '../Weapons/Weapons';
import Shields from '../Shields/Shields';

export default class Character extends Component {
  static contextType = CharacterContext;

  state = { editNameCharId: null, expand: false };

  componentDidMount() {
    if (this.props.char.character === 'Bank') this.setState({ expand: true });
  }

  setEditNameCharId = e => {
    let id = Number(e.target.value);
    this.context.setEditNameCharId(id);
    /*
    console.log(id);
    if (id === this.state.editNameCharId) id = null;
    this.setState({ editNameCharId: id });
    */
  };

  setEditNameCharIdNull = () => {
    this.context.setEditNameCharId(null);
  };

  getEditNameForm(charId) {
    //this.setState({ editNameCharId: null });
    return (
      <form
        className="Characters__editNameForm"
        onSubmit={e => this.context.handleSubmitEditCharacter(charId, e)}
      >
        <div>
          <label htmlFor="editCharName">Name</label>
          <input type="text" id="editCharName" name="name" />
        </div>
        <div className="Characters_editNameFormButtons">
          <button className="blue_bg" type="submit">
            SUBMIT
          </button>
          <button className="blue_bg" onClick={this.setEditNameCharIdNull}>
            CANCEL
          </button>
        </div>
      </form>
    );
  }

  render() {
    const { bankId, handleDeleteCharacter, setEditNameCharId, getEditNameCharId } = this.context;
    const char = this.props.char;
    const expandIcon = StyleIcon({ style: `${this.state.expand ? 'expandBig' : 'collapseBig'}` });
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
              <button className="blue_bg" value={char.id} onClick={() => setEditNameCharId(char.id)}>
                EDIT NAME
              </button>
              <button className="blue_bg" value={char.id} onClick={handleDeleteCharacter}>
                DELETE
              </button>
            </>
          )}
        </div>
        {getEditNameCharId() === char.id && this.getEditNameForm(char.id)}
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

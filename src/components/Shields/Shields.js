import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import ShieldsTable from '../ShieldsTable/ShieldsTable';
import StyleIcon from '../StyleIcon/StyleIcon';
import Shield from '../Shield/Shield';

export default class Shields extends Component {
  static contextType = CharacterContext;

  state = { expand: true };

  render() {
    const { characters, addShieldClickEvent, currentCharAddShieldExpanded } = this.context;
    const character = characters.find(char => {
      return char.id === this.props.charId;
    });
    const shields = character.shields;
    return (
      <div className="Weapons__list-container">
        <div className="Weapons__head" onClick={() => this.setState({ expand: !this.state.expand })}>
          <div className="Weapons__title">
            {StyleIcon({ style: `${this.state.expand ? 'expand' : 'collapse'}` })}
            <h3>Shields</h3>
          </div>
          <button
            className="yellow_bg"
            onClick={e => {
              e.stopPropagation();
              addShieldClickEvent(character.id);
            }}
          >
            ADD SHIELDS
          </button>
        </div>
        {currentCharAddShieldExpanded === character.id ? <ShieldsTable /> : ''}
        {this.state.expand && (
          <ul className="Weapons__list">
            {shields.map(shield => (
              <Shield shield={shield} charId={character.id} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

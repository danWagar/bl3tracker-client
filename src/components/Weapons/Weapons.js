import React, { Component } from 'react';
import CharacterContext from '../../contexts/CharacterContext';
import StyleIcon from '../StyleIcon/StyleIcon';
import Weapon from '../Weapon/Weapon';
import WeaponsTable from '../WeaponsTable/WeaponsTable';

export default class Weapons extends Component {
  static contextType = CharacterContext;

  state = { expand: true };

  render() {
    const { characters, addWeaponClickEvent, currentCharAddWeaponExpanded } = this.context;
    const character = characters.find(char => {
      return char.id === this.props.charId;
    });
    const weapons = character.weapons;
    return (
      <div className="Weapons__list-container">
        <div className="Weapons__head" onClick={() => this.setState({ expand: !this.state.expand })}>
          <div className="Weapons__title">
            {StyleIcon({ style: `${this.state.expand ? 'expand' : 'collapse'}` })}
            <h3>Weapons</h3>
          </div>

          <button
            className="yellow_bg"
            onClick={e => {
              e.stopPropagation();
              addWeaponClickEvent(character.id);
            }}
          >
            ADD WEAPONS
          </button>
        </div>
        {currentCharAddWeaponExpanded === character.id ? <WeaponsTable /> : ''}
        {this.state.expand && (
          <ul className="Weapons__list">
            {weapons.map(wpn => (
              <Weapon key={wpn.user_weapon_id} wpn={wpn} charId={character.id} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

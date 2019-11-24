import React, { Component } from 'react';
import trackerService from '../services/bl3-tracker-api-service';

const CharacterContext = React.createContext({
  characters: [],
  currentCharAddWeaponExpanded: null,
  currentCharAddShieldExpanded: null,
  error: null,
  setError: () => {},
  clearError: () => {},
  addWeaponClickEvent: () => {},
  updateChars: () => {}
});
export default CharacterContext;

export class CharacterProvider extends Component {
  state = {
    characters: [],
    currentCharAddWeaponExpanded: null,
    error: null
  };

  clearContext = () => {
    this.setState({
      characters: [],
      currentCharAddWeaponExpanded: null,
      error: null
    });
  };

  handleSubmitAddCharacter = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { character, name } = ev.target;

    trackerService
      .addCharacter({
        character: character.value,
        character_name: name.value
      })
      .then(char => {
        //character.value = '';
        //name.value = '';
        char.weapons = [];
        char.shields = [];
        char.addWeapons = false;
        this.setState({ characters: [...this.state.characters, char] });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  initCharacters = characters => {
    let chars = characters.map(char => {
      char.weapons = [];
      char.shields = [];
      char.addInventory = false;
      return char;
    });
    this.setState({ characters: [...this.state.characters, ...chars] });
  };

  initCharacterWeapons = (char_id, weapons) => {
    let characters = this.state.characters;
    characters = characters.map(char => {
      if (char.id === char_id) char.weapons = weapons;
      return char;
    });
    this.setState({ characters: characters });
  };

  initCharacterShields = (char_id, shields) => {
    let characters = this.state.characters;
    characters = characters.map(char => {
      if (char.id === char_id) char.shields = shields;
      return char;
    });
    this.setState({ characters: characters });
  };

  addWeaponClickEvent = id => {
    if (this.state.currentCharAddWeaponExpanded === id) id = null;
    this.setState({ currentCharAddWeaponExpanded: id });
  };

  addShieldClickEvent = id => {
    if (this.state.currentCharAddShieldExpanded === id) id = null;
    this.setState({ currentCharAddShieldExpanded: id });
  };

  /*
  updateChars = () => {
    //refactor: inserting returns item in res, so just need to update state by passing res from character.js
    trackerService
      .getCharacters()
      .then(res =>
        this.setState({
          characters: [this.state.characters[0], ...res],
          addCharacter: !this.state.addCharacter
        })
      )
      .then(() => console.log(this.state.characters))
      .catch(console.log('error'));
  };
  */

  handleSubmitWeapon = wpn => {
    for (const [key, value] of Object.entries(wpn)) if (value === '') wpn[key] = null;

    trackerService
      .postWeapon(wpn)
      .then(res => {
        let characters = this.state.characters;
        characters = characters.map(char => {
          if (char.id === res.char_id) {
            char.weapons = [...char.weapons, res];
          }
          return char;
        });
        this.setState({ characters: characters });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  handleSubmitShield = shield => {
    for (const [key, value] of Object.entries(shield)) if (value === '') shield[key] = null;

    trackerService
      .postShield(shield)
      .then(res => {
        let characters = this.state.characters;
        characters = characters.map(char => {
          //console.log('char.id: ' + char.id + ' res.char_id: ' + res.char_id);
          if (char.id === res.char_id) {
            char.shields = [...char.shields, res];
            //console.log(char.weapons);
          }
          return char;
        });
        this.setState({ characters: characters });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      characters: this.state.characters,
      currentCharAddWeaponExpanded: this.state.currentCharAddWeaponExpanded,
      currentCharAddShieldExpanded: this.state.currentCharAddShieldExpanded,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      clearContext: this.clearContext,
      handleSubmitAddCharacter: this.handleSubmitAddCharacter,
      handleSubmitWeapon: this.handleSubmitWeapon,
      handleSubmitShield: this.handleSubmitShield,
      updateChars: this.updateChars,
      addWeaponClickEvent: this.addWeaponClickEvent,
      addShieldClickEvent: this.addShieldClickEvent,
      initCharacters: this.initCharacters,
      initCharacterWeapons: this.initCharacterWeapons,
      initCharacterShields: this.initCharacterShields
    };
    return <CharacterContext.Provider value={value}>{this.props.children}</CharacterContext.Provider>;
  }
}

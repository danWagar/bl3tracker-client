import React, { Component } from 'react';
import trackerService from '../services/bl3-tracker-api-service';

const defaultChar = {
  id: 0,
  character: 'vault',
  character_name: 'vault',
  inventory: [],
  addInventory: false
};

const CharacterContext = React.createContext({
  characters: [],
  currentCharAddListExpanded: null,
  error: null,
  setError: () => {},
  clearError: () => {},
  addInventoryClickEvent: () => {},
  updateChars: () => {}
});
export default CharacterContext;

export class CharacterProvider extends Component {
  state = {
    characters: [],
    currentCharAddListExpanded: null,
    error: null
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
      .then(res => {
        character.value = '';
        name.value = '';
        this.setState({ characters: [...this.state.characters, res] });
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  initCharacters = characters => {
    this.setState({ characters: [...this.state.characters, ...characters] });
  };

  initCharacterWeapons = (char_id, weapons) => {
    let characters = this.state.characters;
    characters = characters.map(char => {
      if (char.id === char_id) char.inventory = weapons;
      return char;
    });
    this.setState({ characters: characters });
  };

  addInventoryClickEvent = id => {
    console.log('char id clicked is ' + id);
    console.log('currentCharAddListExpanded is ' + this.state.currentCharAddListExpanded);
    if (this.state.currentCharAddListExpanded === id) id = null;
    this.setState({ currentCharAddListExpanded: id });
  };

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

  handleSubmitWeapon = wpn => {
    for (const [key, value] of Object.entries(wpn)) if (value === '') wpn[key] = null;

    trackerService
      .postWeapon(wpn)
      .then(res => {
        //for (const [key, value] of Object.entries(wpn)) if (!value) res[key] = null;
        let characters = this.state.characters;
        characters = characters.map(char => {
          //console.log('char.id: ' + char.id + ' res.char_id: ' + res.char_id);
          if (char.id === res.char_id) {
            char.inventory = [...char.inventory, res];
            //console.log(char.inventory);
          }
          return char;
        });
        //console.log(characters[0].inventory);
        this.setState({ characters: characters });
      })
      .then(console.log(this.state.characters[0].inventory))
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
      currentCharAddListExpanded: this.state.currentCharAddListExpanded,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      handleSubmitAddCharacter: this.handleSubmitAddCharacter,
      handleSubmitWeapon: this.handleSubmitWeapon,
      updateChars: this.updateChars,
      addInventoryClickEvent: this.addInventoryClickEvent,
      initCharacters: this.initCharacters,
      initCharacterWeapons: this.initCharacterWeapons
    };
    return <CharacterContext.Provider value={value}>{this.props.children}</CharacterContext.Provider>;
  }
}

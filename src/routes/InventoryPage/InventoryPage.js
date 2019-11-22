import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import trackerService from '../../services/bl3-tracker-api-service';
import CharacterContext from '../../contexts/CharacterContext';
import Characters from '../../components/Characters/Characters';
import AddCharacterForm from '../../components/AddCharacterForm/AddCharacterForm';
import './InventoryPage.css';

export default class InventoryPage extends Component {
  static contextType = CharacterContext;

  state = {
    loaded: false,
    addCharacter: false
  };

  componentDidMount() {
    this.context.clearError();
    trackerService
      .getCharacters()
      .then(this.context.initCharacters)
      .then(() =>
        this.context.characters.map(char =>
          trackerService
            .getCharacterWeapons(char.id)
            .then(weapons => this.context.initCharacterWeapons(char.id, weapons))
            .then(this.setState({ loaded: true }))
        )
      )
      .catch(this.context.setError);
  }
  /*
  addInventoryClickEvent = id => {
    let chars = this.state.characters;
    chars = chars.map(ch => {
      if (ch.id === id) ch.addInventory = !ch.addInventory;
      return ch;
    });
    this.setState({ characters: chars });
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
    trackerService.postWeapon(wpn).then(res => {
      const characters = this.state.characters;
      characters = characters.map(char => {
        if (char.id === res.char_id) char.inventory = [...char.inventory, res];
        return char;
      });
      this.setState({ characters: characters });
    });
  };
  */

  render() {
    if (!this.state.loaded) return <p>Loading</p>;
    const { error } = this.context;
    return (
      <Section className="InventoryPage">
        {error && <p className="red">There was an error, try again</p>}
        <button onClick={e => this.setState({ addCharacter: !this.state.addCharacter })}>
          Add Character
        </button>
        {this.state.addCharacter && <AddCharacterForm />}
        <Characters />
        {/*
        {characters.map(char => (
          <Character
            id={char.id}
            type={char.character}
            name={char.character_name}
            inventory={char.inventory}
            addInventory={char.addInventory}
            addInventoryClickEvent={this.addInventoryClickEvent}
            handleSubmitWeapon={this.handleSubmitWeapon}
          />
        ))}
        */}
      </Section>
    );
  }
}

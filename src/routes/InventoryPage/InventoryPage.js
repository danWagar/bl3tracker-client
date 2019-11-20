import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import trackerService from '../../services/bl3-tracker-api-service';
import Character from '../../components/Character/Character';
import AddCharacterForm from '../../components/AddCharacterForm/AddCharacterForm';
import './InventoryPage.css';

export default class InventoryPage extends Component {
  state = {
    characters: [
      {
        id: 1,
        character: 'vault',
        character_name: 'vault',
        inventory: [],
        addInventory: false
      }
    ],
    addCharacter: false
  };

  componentDidMount() {
    trackerService
      .getCharacters()
      .then(res => this.setState({ characters: [...this.state.characters, ...res] }))
      .then(() => console.log(this.state.characters));
  }

  addInventoryClickEvent = id => {
    let chars = this.state.characters;
    chars = chars.map(ch => {
      if (ch.id === id) ch.addInventory = !ch.addInventory;
      return ch;
    });
    this.setState({ characters: chars });
  };

  updateChars = () => {
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

  render() {
    return (
      <Section className="InventoryPage">
        <button onClick={e => this.setState({ addCharacter: !this.state.addCharacter })}>
          Add Character
        </button>
        {this.state.addCharacter && <AddCharacterForm updateChars={this.updateChars} />}
        {this.state.characters.map(char => (
          <Character
            id={char.id}
            type={char.character}
            name={char.character_name}
            inventory={char.inventory}
            addInventory={char.addInventory}
            addInventoryClickEvent={this.addInventoryClickEvent}
            items={this.state.items}
          />
        ))}
      </Section>
    );
  }
}

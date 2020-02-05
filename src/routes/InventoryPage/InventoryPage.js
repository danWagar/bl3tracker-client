import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';
import trackerService from '../../services/bl3-tracker-api-service';
import CharacterContext from '../../contexts/CharacterContext';
import Character from '../../components/Character/Character';
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
        )
      )
      .then(() =>
        this.context.characters.map(char =>
          trackerService
            .getCharacterShields(char.id)
            .then(shields => this.context.initCharacterShields(char.id, shields))
            .then(this.setState({ loaded: true }))
        )
      )
      .catch(this.context.setError);
  }

  toggleAddCharacter = () => {
    this.setState({ addCharacter: !this.state.addCharacter });
  };

  render() {
    if (!this.state.loaded) return <p>Loading</p>;
    const { error, characters } = this.context;
    return (
      <Section className="InventoryPage">
        {error && <p className="red">There was an error, try again</p>}
        <button className="InventoryPage__add-char" onClick={this.toggleAddCharacter}>
          ADD CHARACTER
        </button>
        {this.state.addCharacter && <AddCharacterForm toggleAddCharacter={this.toggleAddCharacter} />}
        {characters.map(char => (
          <Character key={char.id} char={char} />
        ))}
      </Section>
    );
  }
}

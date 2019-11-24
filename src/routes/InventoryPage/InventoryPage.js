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
      </Section>
    );
  }
}

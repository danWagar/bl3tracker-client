import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import TrackerApiService from '../../services/bl3-tracker-api-service';

export default class AddCharacterForm extends Component {
  state = { error: null };

  handleSubmitAddCharacter = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { character, name } = ev.target;

    TrackerApiService.addCharacter({
      character: character.value,
      character_name: name.value
    })
      .then(res => {
        character.value = '';
        name.value = '';
        this.props.updateChars();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="AddCharacterForm" onSubmit={this.handleSubmitAddCharacter}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="character">
          <label htmlFor="AddCharacterForm__character">Character</label>
          <select required name="character" id="AddCharacterForm__character">
            <option value="FL4K">FL4K</option>
            <option value="Zane">Zane</option>
            <option value="Moze">Moze</option>
            <option value="Amara">Amara</option>
          </select>
        </div>
        <div className="name">
          <label htmlFor="AddCharacterForm__name">Name (optional)</label>
          <Input required name="name" type="text" id="AddCharacterForm__name"></Input>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

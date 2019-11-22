import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import CharacterContext from '../../contexts/CharacterContext';

export default class AddCharacterForm extends Component {
  static contextType = CharacterContext;

  render() {
    const { error, handleSubmitAddCharacter } = this.context;
    return (
      <form className="AddCharacterForm" onSubmit={handleSubmitAddCharacter}>
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

import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import CharacterContext from '../../contexts/CharacterContext';
import './AddCharacterForm.css';

export default class AddCharacterForm extends Component {
  static contextType = CharacterContext;

  handleFormSubmit = e => {
    this.context.handleSubmitAddCharacter(e);
    this.props.toggleAddCharacter();
  };

  render() {
    const { error } = this.context;
    return (
      <form className="AddCharacterForm" onSubmit={this.handleFormSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="AddCharacterForm__character">
          <label htmlFor="AddCharacterForm__character">Character</label>
          <select required name="character" id="AddCharacterForm__character">
            <option value="FL4K">FL4K</option>
            <option value="Zane">Zane</option>
            <option value="Moze">Moze</option>
            <option value="Amara">Amara</option>
          </select>
        </div>
        <div className="AddCharacterForm__name">
          <label htmlFor="AddCharacterForm__name">Name (optional)</label>
          <Input name="name" type="text" id="AddCharacterForm__name"></Input>
        </div>
        <Button className="link_as_btn yellow_bg" type="submit">
          SUBMIT
        </Button>
      </form>
    );
  }
}

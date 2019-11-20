import React, { Component } from 'react';

export default class UserItemForm extends Component {
  render() {
    return (
      <form className="UserItemForm">
        <label htmlFor="UserItemForm__prefix1">Prefix 1</label>
        <select name="prefix1" id="UserItemForm__prefix1"></select>
        <label htmlFor="UserItemForm__prefix2">Prefix 2</label>
        <select name="prefix1" id="UserItemForm__prefix2"></select>
        <label htmlFor="UserItemForm__element">Element</label>
        <select name="element" id="UserItemForm__element">
          <option value="normal">normal</option>
          <option value="fire">fire</option>
          <option value="corrosive">corrosive</option>
          <option value="shock">shock</option>
          <option value="cryo">cryo</option>
          <option value="radiation">radiation</option>
        </select>
        <lable htmlFor="UserItemForm__anointment_id">Anointment</lable>
        <select name="anointment_id" id="UserItemForm__anointment_id"></select>
        <label htmlFor="UserItemForm__item_score">Item Score</label>
        <input type="text" name="item_score" id="UserItemForm__item_score" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

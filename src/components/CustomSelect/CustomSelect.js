import React, { Component } from 'react';
import './CustomSelect.css';

export default class CustomSelect extends Component {
  state = {
    extended: false
  };

  toggleExtended = () => {
    this.setState({ extended: !this.state.extended });
  };

  extendOptions = () => {
    return this.props.options.map(option => {
      console.log(option);
      console.log(typeof option.id);
      return typeof option.id === 'number' ? (
        <li className="CustomSelect__option" value={option.id} onClick={this.handleSelect}>
          {option.text}
        </li>
      ) : (
        <li className="CustomSelect__option" data-value={option.id} onClick={this.handleSelect}>
          {option.text}
        </li>
      );
    });
  };

  handleSelect = e => {
    let val;
    console.log(e.target);
    if (e.target.value) val = e.target.value;
    else val = e.target.getAttribute('data-value');
    console.log(val);
    this.toggleExtended();
    this.props.setValue(val);
  };

  render() {
    return (
      <ul className="CustomSelect">
        <li className="CustomSelect__header" onClick={this.toggleExtended}>
          {this.props.headerText}
        </li>
        {this.state.extended && this.extendOptions()}
      </ul>
    );
  }
}

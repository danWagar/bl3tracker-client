import React, { Component } from 'react';
import StyleIcon from '../StyleIcon/StyleIcon';
import './CustomSelect.css';

export default class CustomSelect extends Component {
  state = {
    extended: false
  };

  toggleExtended = () => {
    this.setState({ extended: !this.state.extended });
  };

  extendOptions = () => {
    return this.props.options.map((option, i) => {
      return typeof option.id === 'number' ? (
        <li className="CustomSelect__option" key={i} value={option.id} onClick={this.handleSelect}>
          {option.text}
        </li>
      ) : (
        <li className="CustomSelect__option" key={i} data-value={option.id} onClick={this.handleSelect}>
          {option.text}
        </li>
      );
    });
  };

  handleSelect = e => {
    let val;
    if (e.target.value) val = e.target.value;
    else val = e.target.getAttribute('data-value');
    this.toggleExtended();
    this.props.setValue(val);
  };

  render() {
    return (
      <ul className="CustomSelect">
        <li className="CustomSelect__header" key="1" onClick={this.toggleExtended}>
          {this.props.headerText}
          {StyleIcon({ style: 'select' })}
        </li>
        {this.state.extended && this.extendOptions()}
      </ul>
    );
  }
}

import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.item.mfr_name}</td>
        <td>{this.props.item.weapon_type}</td>
        <td>{this.props.item.name}</td>
      </tr>
    );
  }
}

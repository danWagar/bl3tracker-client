import React, { Component } from 'react';
import trackerService from '../../services/bl3-tracker-api-service';
import Items from '../Items/Items';

export default class Character extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <button onClick={() => this.props.addInventoryClickEvent(this.props.id)}>Add Items</button>
        {this.props.addInventory ? <Items id={this.props.id} /> : ''}
      </div>
    );
  }
}

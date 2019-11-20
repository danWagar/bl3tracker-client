import React, { Component } from 'react';
import trackerService from '../../services/bl3-tracker-api-service';
import Item from '../Item/Item';

export default class Items extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    trackerService.getItems().then(res => this.setState({ items: [...this.state.items, ...res] }));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>manufacturer</th>
            <th>type</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map(item => (
            <Item item={item} />
          ))}
        </tbody>
      </table>
    );
  }
}

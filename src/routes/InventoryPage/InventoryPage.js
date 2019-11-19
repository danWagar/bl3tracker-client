import React, { Component } from 'react';
import { Section } from '../../components/Utils/Utils';

export default class InventoryPage extends Component {
  render() {
    return (
      <Section className="InventoryPage">
        <button>Add Character</button>
        <button>Add Items</button>
      </Section>
    );
  }
}

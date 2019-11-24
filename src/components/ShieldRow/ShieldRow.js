import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import UserItemForm from '../UserItemForm/UserItemForm';

export default class ShieldRow extends Component {
  state = {
    addUserItem: false
  };

  toggleAddUserItem = () => {
    this.setState({ addUserItem: !this.state.addUserItem });
  };

  generateUserItemForm() {
    return (
      <tr>
        <td colSpan="4">
          <UserItemForm
            toggleAddUserItem={this.toggleAddUserItem}
            mfr_id={this.props.shield.mfr_id}
            shield_id={this.props.shield.id}
          />
        </td>
      </tr>
    );
  }

  //
  render() {
    return (
      <>
        <tr>
          <td tabIndex="0" onClick={() => this.setState({ addUserItem: !this.state.addUserItem })}>
            {this.state.addUserItem ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
          </td>
          <td>{this.props.shield.mfr_name}</td>
          <td>{this.props.shield.name}</td>
        </tr>
        {this.state.addUserItem && this.generateUserItemForm()}
      </>
    );
  }
}

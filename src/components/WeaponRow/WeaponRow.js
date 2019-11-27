import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import UserWeaponForm from '../UserWeaponForm/UserWeaponForm';

export default class WeaponRow extends Component {
  state = {
    addUserItem: false
  };

  toggleAddUserItem = () => {
    this.setState({ addUserItem: !this.state.addUserItem });
  };

  generateUserWeaponForm() {
    return (
      <tr>
        <td colSpan="4">
          <UserWeaponForm
            toggleAddUserItem={this.toggleAddUserItem}
            mfr_id={this.props.item.mfr_id}
            weapon_id={this.props.item.id}
          />
        </td>
      </tr>
    );
  }

  //
  render() {
    return (
      <>
        <tr tabIndex="0" onClick={() => this.setState({ addUserItem: !this.state.addUserItem })}>
          <td>
            {this.state.addUserItem ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
          </td>
          <td>{this.props.item.mfr_name}</td>
          <td>{this.props.item.weapon_type}</td>
          <td>{this.props.item.name}</td>
        </tr>
        {this.state.addUserItem && this.generateUserWeaponForm()}
      </>
    );
  }
}

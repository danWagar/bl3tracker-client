import React, { Component } from 'react';

const UserItemListContext = React.createContext({
  itemList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setItemList: () => {}
});
export default UserItemListContext;

export class UserItemListProvider extends Component {
  state = {
    itemList: [],
    error: null
  };

  setItemList = itemList => {
    this.setState({ itemList });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      itemList: this.state.itemList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setItemList: this.setItemList
    };
    return <ItemListContext.Provider value={value}>{this.props.children}</ItemListContext.Provider>;
  }
}

import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import LandingPage from '../LandingPage/LandingPage.js';
import LoginPage from '../../routes/LoginPage/LoginPage';
import InventoryPage from '../../routes/InventoryPage/InventoryPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import Demo from '../../routes/Demo/Demo';
import './App.css';

class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Header location={this.props.location} />
        </header>
        <main className="App__main">
          {this.state.hasError && <p className="red">There was an error! Oh no!</p>}
          <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <PublicOnlyRoute path={'/login'} component={LoginPage} />
            <PublicOnlyRoute path={'/register'} component={RegistrationPage} />
            <PublicOnlyRoute path={'/demo'} component={Demo} />
            <PrivateRoute path={'/inventory'} component={InventoryPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);

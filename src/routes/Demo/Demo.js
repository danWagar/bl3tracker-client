import React, { Component } from 'react';
import { Button, Input } from '../../components/Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import './Demo.css';

export default class Demo extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = { error: null };

  handleSubmitBasicAuth = ev => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    TokenService.saveAuthToken(TokenService.makeBasicAuthToken(user_name.value, password.value));

    user_name.value = '';
    password.value = '';
    this.props.onLoginSuccess();
  };

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="Demo" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="user_name">
          <label htmlFor="LoginForm__user_name">User name</label>
          <Input required name="user_name" id="LoginForm__user_name" value="demo" readOnly></Input>
        </div>
        <div className="password">
          <label htmlFor="LoginForm__password">Password</label>
          <Input
            required
            name="password"
            type="password"
            id="LoginForm__password"
            value="password1"
            readOnly
          ></Input>
        </div>
        <Button className="yellow_bg" type="submit">
          LOGIN
        </Button>
      </form>
    );
  }
}

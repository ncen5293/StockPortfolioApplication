import React, { Component } from 'react';
import { Button, Modal, Form, Message  } from 'semantic-ui-react';
import axios from 'axios';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: false,
      loginError: false
    }
  }

  toggleLogin = (event) => {
    this.setState((state) => {
      return {isLoginOpen: !state.isLoginOpen};
    });
    this.setState({loginError: false});
  }

  loginAccount = (event) => {
    const loginInfo = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    axios.get("http://localhost:8080/stocks/users", {params: { email:loginInfo.email, password:loginInfo.password }})
      .then(res => {
        if (res.data.correctInfo) {
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('name', res.data.portfolio.Name);
          localStorage.setItem('email', res.data.portfolio.Email);
          localStorage.setItem('balance', res.data.portfolio.Balance);
          window.location.reload();
        } else {
          this.setState({loginError: true});
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    let warning = <div />;
    if (this.state.loginError) {
      warning = <Message negative>
                  <Message.Header>Unable to Log-in!</Message.Header>
                    <p>You have entered the wrong information</p>
                </Message>;
    }

    return (
      <div>
        <Button fluid={this.props.isFluid} onClick={this.toggleLogin} icon='user outline' labelPosition='left' content="Log-in"/>
        <Modal size="mini" open={this.state.isLoginOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.toggleLogin} >
          <Modal.Header>Log in to an existing Account</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.loginAccount} >
              {warning}
              <Form.Field>
                <label>E-mail</label>
                <input defaultValue="" type="email" name="email" placeholder='example@mail.com' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input defaultValue="" type="password" name="password" placeholder='Password' />
              </Form.Field>
              <Button primary type='submit'>Log-in</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default LoginButton;

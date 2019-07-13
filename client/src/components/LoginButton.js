import React, { Component } from 'react';
import { Button, Modal, Form  } from 'semantic-ui-react';

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
  }

  loginAccount = (event) => {
    console.log(event.target.name.value);
    this.toggleLogin();
  }

  render() {
    let warning = <div />;
    if (this.state.loginError) {
      warning = <div />;
    }
    
    return (
      <div>
        <button onClick={this.toggleLogin} className="ui button">Log-in</button>
        <Modal open={this.state.isLoginOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.toggleLogin} >
          <Modal.Header>Log in to an existing Account</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.loginAccount} >
              <Form.Field>
                <label>E-mail</label>
                <input defaultValue="" name="email" placeholder='example@mail.com' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input defaultValue="" name="password" placeholder='Password' />
              </Form.Field>
              {warning}
              <Button type='submit'>Register</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default LoginButton;

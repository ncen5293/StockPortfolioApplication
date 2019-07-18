import React, { Component } from 'react';
import { Button, Modal, Form  } from 'semantic-ui-react';

class SignUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUpOpen: false,
      existingEmail: false,
      badPassword: false
    }
  }

  toggleSignUp = () => {
    this.setState((state) => {
      return {isSignUpOpen: !state.isSignUpOpen};
    });
  }

  registerAccount = (event) => {
    console.log(event.target.name.value);
    this.toggleSignUp();
    localStorage.setItem('isLoggedIn', true)
    window.location.reload();
  }

  render() {
    let warning = <div />;
    const existingEmail = this.state.existingEmail;
    const badPassword = this.state.badPassword;
    if (existingEmail && badPassword) {
      warning = <div />;
    } else if (existingEmail) {
      warning = <div />;
    } else {
      warning = <div />;
    }

    return (
      <div>
        <Button onClick={this.toggleSignUp} icon='plus' labelPosition='left' content="Sign-Up"/>
        <Modal compact size="mini" open={this.state.isSignUpOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.toggleSignUp} >
          <Modal.Header>Create a new Account</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.registerAccount} >
              <Form.Field>
                <label>Full Name</label>
                <input defaultValue="" name="name" placeholder='John Doe' />
              </Form.Field>
              <Form.Field>
                <label>E-mail</label>
                <input defaultValue="" name="email" placeholder='example@mail.com' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input defaultValue="" name="password" placeholder='Password' />
              </Form.Field>
              {warning}
              <Button primary type='submit'>Register</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default SignUpButton;

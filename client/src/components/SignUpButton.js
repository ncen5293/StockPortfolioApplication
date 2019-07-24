import React, { Component } from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react';
import axios from 'axios';

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
    if (event.target.password.value.length > 4) {
      const newUser = {
        Name: event.target.name.value,
        Email: event.target.email.value,
        Password: event.target.password.value,
        Stocks: [],
        Balance: 5000
      }
      axios.post("http://localhost:8080/stocks/users", newUser)
        .then(res => {
          if (!res.data.emailInUse) {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('name', res.data.newUser.Name);
            localStorage.setItem('email', res.data.newUser.Email);
            localStorage.setItem('balance', res.data.newUser.Balance);
            window.location.reload();
          } else {
            this.setState({existingEmail: true});
          }
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      this.setState({badPassword: true});
    }
  }

  render() {
    let warning = <div />;
    const existingEmail = this.state.existingEmail;
    const badPassword = this.state.badPassword;
    if (existingEmail) {
      warning = <Message negative>
                  <Message.Header>Unable to create Account</Message.Header>
                    <p>E-mail is already in use!</p>
                </Message>;
    } else if (badPassword) {
      warning = <Message negative>
                  <Message.Header>Unable to create Account</Message.Header>
                    <p>Your password needs to be at least 5 letters!</p>
                </Message>;
    }

    if (this.props.isFluid) {
      return (
        <div>
          <Button fluid onClick={this.toggleSignUp} icon='plus' labelPosition='left' content="Sign-Up"/>
          <Modal size="mini" open={this.state.isSignUpOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.toggleSignUp} >
            <Modal.Header>Create a new Account</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.registerAccount} >
                {warning}
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
                <Button primary type='submit'>Register</Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={this.toggleSignUp} icon='plus' labelPosition='left' content="Sign-Up"/>
          <Modal size="mini" open={this.state.isSignUpOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.toggleSignUp} >
            <Modal.Header>Create a new Account</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.registerAccount} >
                {warning}
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
                <Button primary type='submit'>Register</Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
      );
    }
  }
}

export default SignUpButton;

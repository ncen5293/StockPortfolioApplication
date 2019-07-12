import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class SignUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignUpOpen: false
    }
  }

  toggleSignUp = (event) => {
    this.setState((state) => {
      return {isSignUpOpen: !state.isSignUpOpen};
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleSignUp} className="ui button">Sign-Up</button>
        <Modal open={this.state.isSignUpOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.toggleSignUp} >
          <Modal.Header>Create a new Account</Modal.Header>
          <Modal.Content>

          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default SignUpButton;

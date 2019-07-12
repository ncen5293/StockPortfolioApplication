import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: false
    }
  }

  toggleLogin = (event) => {
    this.setState((state) => {
      return {isLoginOpen: !state.isLoginOpen};
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleLogin} className="ui button">Log-in</button>
        <Modal open={this.state.isLoginOpen} closeOnEscape={true} closeOnDimmerClick={true} onClose={this.toggleLogin} >
          <Modal.Header>Log in to an existing Account</Modal.Header>
          <Modal.Content>

          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default LoginButton;

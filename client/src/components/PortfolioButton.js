import React, { Component } from 'react';
import { Button  } from 'semantic-ui-react';

class PortfolioButton extends Component {
  goToPortfolio = () => {
    window.location.replace('/portfolio');
  }

  render() {
    return (
      <div>
        <Button onClick={this.goToPortfolio} icon='id card' labelPosition='left' content="My Portfolio"/>
      </div>
    );
  }
}

export default PortfolioButton;

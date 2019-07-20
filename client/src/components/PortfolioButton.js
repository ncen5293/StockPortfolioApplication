import React, { Component } from 'react';
import { Button  } from 'semantic-ui-react';

class PortfolioButton extends Component {
  goToPortfolio = () => {
    window.location.replace('/portfolio');
  }

  render() {
    if (this.props.isFluid) {
      return (
        <div>
          <Button fluid onClick={this.goToPortfolio} icon='id card' labelPosition='left' content="Transactions"/>
        </div>
      );
    } else {
      return (
        <div>
          <Button onClick={this.goToPortfolio} icon='id card' labelPosition='left' content="Transactions"/>
        </div>
      );
    }
  }
}

export default PortfolioButton;

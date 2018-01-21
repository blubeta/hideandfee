import React, { Component } from 'react';

class BuySell extends Component {

  constructor() {
    super();

    this.state = {
      transaction: null,
      baseCurrency: null,
      exchangeCurrency: null,
      isEditing: true,
    }
  }

  render() {

    const buyOrSell = this.state.transaction ? this.state.transaction : '...';

    return (
      <div className="flex flex-col">
        <div className="card-dark">
          <span className="card-title"> Would you like to buy or sell a coin? </span>
          <div className="flex justify-around items-center mt-4">
            <div
              className={ this.state.transaction == 'buy' ? 'active-btn' : 'btn' }
              onClick={ () => this.setState({ transaction: 'buy' }) }
            >
              Buying
            </div>
            <div
              className={ this.state.transaction == 'sell' ? 'active-btn' : 'btn' }
              onClick={ () => this.setState({ transaction: 'sell' }) }
            >
              Selling
            </div>
          </div>
        </div>
        <div className="card-dark full">
          <span className="mb-8">
            {`Which coin would you like to ${ buyOrSell  }?`}
          </span>
          <span>
            I have...
          </span>
          <div className="exchange-card">
            <select className="styled-input" placeholder="Coin">
              <option>Select a Coin</option>
              <option> WEEN </option>
              <option> AUTO </option>
              <option> MACHINE </option>
            </select>
            <input type="number" placeholder="Amount" className="styled-input" />
          </div>
          <div className="arrows-container">
            <div className="arrows-icon" />
          </div>
          <span className="m-4">
            I want...
          </span>
          <div className="exchange-card">
            <select className="styled-input" placeholder="Coin">
              <option>Select a Coin</option>
              <option> WEEN </option>
              <option> AUTO </option>
              <option> MACHINE </option>
            </select>
            <input type="number" placeholder="Amount" className="styled-input" />
          </div>
        </div>
      </div>
    );
  }
}

export default BuySell;
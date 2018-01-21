import React, { Component } from 'react';

class BuySell extends Component {

  constructor() {
    super();

    this.state = {
      transaction: null,
      baseCurrency: null,
      baseConversion: 0,
      baseConversionUSD: 0,
      exchangeCurrency: null,
      exchangeAmount: 0,
      exchangeConversionUSD: 0,
      exchangeConversion: 0,
      isEditing: true,
    }
  }

  render() {

    const buyOrSell = this.state.transaction ? this.state.transaction : '...';

    return (
      <div>
        {
          this.state.isEditing ? (
            <div className="flex flex-col">
              <div className="card">
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
                <span>
                  I have...
                </span>
                <div className="exchange-card" style={{ marginBottom: '2rem' }}>
                  <select className="styled-input" placeholder="Coin">
                    <option>Select a Coin</option>
                    <option> WEEN </option>
                    <option> AUTO </option>
                    <option> MACHINE </option>
                  </select>
                  <input type="number" placeholder="Amount" className="styled-input" />
                  <span className="conversion-totals">
                    {`Market Value = $${this.state.baseConversionUSD} (${this.state.baseConversion})`}
                  </span>
                </div>
                <div className="arrows-container">
                  <div className="arrows-icon" />
                </div>
                <span className="mt-4">
                  I want...
                </span>
                <div className="exchange-card">
                  <select className="styled-input" placeholder="Coin">
                    <option>Select a Coin</option>
                    <option> WEEN </option>
                    <option> AUTO </option>
                    <option> MACHINE </option>
                  </select>
                  <input
                    type="number"
                    value={ this.state.exchangeAmount }
                    className="styled-input"
                    disabled
                  />
                  <span className="conversion-totals">
                    {`Market Value = $${this.state.exchangeConversionUSD} (${this.state.exchangeConversion})`}
                  </span>
                </div>
              </div>
              <div
                className="active-btn flex justify-center m-8"
                onClick={ () => this.setState({ isEditing: false }) }
              >
                <span> Finish </span>
              </div>
            </div>
          ) : (
          <div className="buy-sell-header">
            <span> BuyOrSell 234 XRP with BTC </span>
            <span
              className="btn-simple"
              onClick={ () => this.setState({ isEditing: true }) }
            >
              edit
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default BuySell;
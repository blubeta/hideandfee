import React, { Component } from 'react';
import { isHardwareWallet } from '../Redux/actions'
import { connect }        from 'react-redux';
import getSteps           from '../utils/API'
import { setSteps,
         setCoinIHave,
         setCoinIWant,
         setAmount,
         }           from '../Redux/actions'

class BuySell extends Component {

  constructor(props) {
    super(props);

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

  submitSteps = () => {
    const stepsPayload = [this.props.coinIHave, this.props.coinIWant, this.props.amount]
    if (stepsPayload.every((val) => (val))) {
      getSteps(...stepsPayload).then((resp) => { this.props.dispatch(setSteps(resp)) })
    }
  }

  handleChange = (...values) => {
    values[0] || this.props.coinIHave ? this.props.dispatch(setCoinIHave(values[0]  || this.props.coinIHave)) : null
    values[1] || this.props.coinIWant ? this.props.dispatch(setCoinIWant(values[1]  || this.props.coinIWant)) : null
    values[2] || this.props.amount    ? this.props.dispatch(setAmount(values[2]     || this.props.amount))    : null
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
                  <select className="styled-input" placeholder="Coin" onChange={(e) => this.handleChange(e.target.value, null, null)}>
                    <option>Select a Coin</option>
                    <option> BTC </option>
                    <option> ETH </option>
                    <option> USDT </option>
                    <option> XRP </option>
                  </select>
                  <input type="number" placeholder="Amount" className="styled-input" onChange={(e) => this.handleChange(null, null, e.target.value)}/>
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
                  <select className="styled-input" placeholder="Coin" onChange={(e) => this.handleChange(null, e.target.value, null)}>
                    <option>Select a Coin</option>
                    <option> XRP </option>
                    <option> DNT </option>
                    <option> MEME </option>
                    <option> USDT </option>
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
                onClick={ () => { this.submitSteps() } }
              >
                <span> Calculate </span>
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

function mapStateToProps(state) {
  return {
            coinIHave: state.coinIHave,
            coinIWant: state.coinIWant,
            amount: state.amount
         }
}

export default connect(mapStateToProps)(BuySell);

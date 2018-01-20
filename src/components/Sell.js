import React, { Component } from 'react';

class Sell extends Component {
  render() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col justify-around items-center m-4 h-24">
          <span className="text-base"> Where are your coins stored?  </span>
        </div>
        <div className="flex flex-col justify-around items-center m-4">
          <div className="btn">
            Hardware Wallet
          </div>
          <div className="btn">
            Hardware Wallet
          </div>
        </div>
      </div>
    );
  }
}

export default Sell;
import React, { Component } from 'react';

class BuySell extends Component {
  render() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col justify-around items-center m-4 h-24">
          <span className="text-base"> Are you going to store your coins on a hardware wallet?  </span>
        </div>
        <div className="flex flex-col justify-around items-center m-4">
          <div className="btn">
            Yes
          </div>
          <div className="btn">
            No
          </div>
        </div>
      </div>
    );
  }
}

export default BuySell;
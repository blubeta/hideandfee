import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col justify-around items-center m-4 h-24">
          <span className="text-4xl"> Hide&Fee </span>
          <span className="text-base"> Really enticing copy about our app!  </span>
        </div>
        <div className="flex flex-col justify-around items-center m-4">
          <Link to="/buy" className="btn">
            I want to buy an alt-coin
          </Link>
          <Link to="/sell" className="btn">
            I want to sell an alt-coin
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
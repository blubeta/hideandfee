import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="flex flex-col">
        <div className="card h-24">
          <span className="text-4xl"> Hide&Fee </span>
          <span className="text-base"> Really enticing copy about our app!  </span>
        </div>
        <div className="card">
          <Link to="/dashboard" className="btn">
            I want to buy an alt-coin
          </Link>
          <Link to="/dashboard" className="btn">
            I want to sell an alt-coin
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
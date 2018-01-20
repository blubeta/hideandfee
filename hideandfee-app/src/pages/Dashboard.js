import React, { Component } from 'react';

import BuySell from '../components/BuySell.js'
import Results from '../components/Results.js'

class Dashboard extends Component {
  render() {
    return (
      <div className="flex flex-col">
        <BuySell />
        <Results />
      </div>
    );
  }
}

export default Dashboard;
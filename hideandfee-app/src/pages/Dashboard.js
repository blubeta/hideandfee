import React, { Component } from 'react';

import BuySell from '../components/BuySell';
import Results from '../components/Results';

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

import React, { Component } from 'react';
import { connect }        from 'react-redux';

import BuySell from '../components/BuySell';
import Results from '../components/Results';

class Dashboard extends Component {
  render() {
    return (
      <div className="flex flex-col">
        <BuySell />
        {this.props.showResults ? <Results />  : ""}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
            showResults: state.showResults,
         }
}

export default connect(mapStateToProps)(Dashboard);

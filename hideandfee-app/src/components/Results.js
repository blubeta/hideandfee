import React, { Component } from 'react'
import redux              from 'redux'
import { connect }        from 'react-redux';

class Results extends Component {
  constructor(props){
      super(props)
  }

  render(){
    return(
      <div className="flex flex-col items-center">
        <span className="result-header"> Results </span>
        <div className="result-row-section px-8" style={{ width: '75%' }}>
          <span className="text-left"> Trade Details </span>
          <span className="text-right"> Fees </span>
        </div>
        { this.props.steps && this.props.steps.map((step) => {
            return (
              <div className="result-row">
                <div className="result-row-section">
                  <span className="text-left"> { step.title } </span>
                  <span className="text-right"> { `$${step.fiatPrice.toFixed(2)}` } </span>
                </div>
                <div className="result-row-section">
                  <span className="text-sm text-left"> { step.description } </span>
                  <span className="text-sm text-right"> { `${step.btcPrice.toFixed(4)} BTC` } </span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    steps: state.steps,
    showResults: state.showResults
  }
}

export default connect(mapStateToProps)(Results);

import React, { Component } from 'react'
import redux              from 'redux'
import { connect }        from 'react-redux';

class Results extends Component {
  constructor(props){
      super(props)
  }

  render(){
    return(
      <div>
      <div className="result-header">
        <span> Results </span>
      </div>
        { this.props.steps && this.props.steps.map((step) => {
            return (
              <div className="result-row">
                <div className="result-row-section">
                  <span> { step.title } </span>
                  <span> { step.fiatPrice.toFixed(2) } </span>
                </div>
                <div className="result-row-section">
                  <span> { step.description } </span>
                  <span> { step.btcPrice.toFixed(4) } </span>
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

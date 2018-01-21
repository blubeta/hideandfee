import React, { Component } from 'react'
import redux              from 'redux'
import { connect }        from 'react-redux';

class Results extends Component {
  constructor(props){
      super(props)
  }

  render(){
    const totalFeesBTC = this.props.steps && this.props.steps.reduce((acc, step) => {return acc + step.btcPrice}, 0);
    const totalFeesFiat = this.props.steps && this.props.steps.reduce((acc, step) => {return acc + step.fiatPrice}, 0);

    console.log(`btcFees: ${totalFeesBTC} ... fiatFees: ${totalFeesFiat}`)

    return(
      <div className="flex flex-col items-center">
        <span className="result-header"> Results </span>
        <div className="result-legend" style={{ width: '58%' }}>
          <span className="text-left"> Trade Details </span>
          <span className="text-right"> Fees </span>
        </div>
        { this.props.steps && this.props.steps
            .map((step, index) => {
            return (
              <div key={index} className="result-row">
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
        <div className="totals-footer">
          <span style={{fontSize: "2.5rem", fontFamily: "Lobster"}}>Total Fees </span>
          {
            totalFeesFiat && totalFeesBTC ?
              <span style={{fontSize: "1.5rem"}}> {`$${totalFeesFiat.toFixed(2)}`} <br/> {`(${totalFeesBTC.toFixed(4)} BTC)`} </span>
            :
              <span />
          }
        </div>
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

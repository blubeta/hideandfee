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
        { this.props.steps ? this.props.steps.map((step) => {

            return (
              <div>
                ISSA MEME
              </div>
            )
          })
            :
          []
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

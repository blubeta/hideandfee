import React, { Component } from 'react';

class Results extends Component {
  render() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col justify-around items-center m-4 h-24">
          <span className="text-base"> You're Rich!  </span>
        </div>
      </div>
    );
  }
}

export default Results;
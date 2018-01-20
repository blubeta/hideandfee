import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Home from './Home'

class App extends Component {
  render(){
    return(
      <div className="h-screen m-4 mt-8">
        <Router>
          <Route exact path="/" component={ Home } />
        </Router>
      </div>
    )
  }
}

export default App;
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Home from './Home'
import Buy from './Buy'
import Sell from './Sell'
import Results from './Results'

class App extends Component {
  render(){
    return(
      <div className="h-screen m-4 mt-8">
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/buy" component={ Buy } />
            <Route path="/sell" component={ Sell } />
            <Route path="/results" component={ Results } />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
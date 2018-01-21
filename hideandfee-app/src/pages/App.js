import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './Home'
import Dashboard from './Dashboard'

class App extends Component {
  render(){
    return(
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/dashboard" component={ Dashboard } />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
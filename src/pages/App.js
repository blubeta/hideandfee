import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './Home'
import Dashboard from './Dashboard'

class App extends Component {
  render(){
    return(
      <div className="app">
        <MuiThemeProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route path="/dashboard" component={ Dashboard } />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App;
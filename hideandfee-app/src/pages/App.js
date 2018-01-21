import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import redux from 'redux'
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import configureStore from '../Redux/store';

import Home from './Home'
import Dashboard from './Dashboard'

const initialState = {}
const history = createHistory();
const { store } = configureStore(initialState, history);

class App extends Component {
  render(){
    return(
      <div className="app">
        <Provider store={store}>
            <Router>
              <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/dashboard" component={ Dashboard } />
              </Switch>
            </Router>
        </Provider>
      </div>
    )
  }
}

export default App;

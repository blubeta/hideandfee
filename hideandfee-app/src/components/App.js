import React, { Component } from 'react';

import createHistory from 'history/createBrowserHistory';
import configureStore from '../Redux/store'
import { Provider } from 'react-redux'

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Home from './Home'
import Buy from './Buy'
import Sell from './Sell'
import Results from './Results'

const initialState = {}
const history = createHistory();
const store = configureStore(initialState, history);

class App extends Component {
  render(){
    return(
      <Provider>
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
      </Provider>
    )
  }
}

export default App;

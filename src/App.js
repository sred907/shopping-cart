import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './containers/Navbar';
import Home from './containers/Home';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
            <div className="App">
              <Navbar/>
              <Switch>
                  <Route exact path="/" component={Home}/>
              </Switch>
             </div>
       </BrowserRouter>
      
    );
  }
}

export default App;

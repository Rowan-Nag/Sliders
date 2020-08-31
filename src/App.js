import React from 'react';
import logo from './logo.svg';
import './App.css'; 
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './hoc/Home/Home';
import About from './hoc/About/About';
import Profile from './hoc/Profile/Profile';
import Navigation from './components/Navigation/Toolbar/Toolbar'


class App extends React.Component {


  render(){
  return (
      <React.Fragment>
        <Navigation/>
              <Switch>
                  <Route path="/profile"         component = { Profile } />
                  <Route path="/about"         component = { About }/>
                  <Route path="/home"           component = { Home }/>
                  <Route path="/"         exact component = { Home }/>
                  <Route                        component = { Home } />
              </Switch>     
      </React.Fragment> 
  
  );
}


}

export default App;

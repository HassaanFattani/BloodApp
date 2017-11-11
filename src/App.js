import React, { Component } from 'react';
import { login } from './services/utils';
import './App.css';
import { RaisedButton, TextField, Paper, IconButton, AppBar, FlatButton } from 'material-ui/';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/navigation';
import SignUp from './components/signup';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import Donor from './components/RegisterDonor';
import { red400, green500 } from 'material-ui/styles/colors';

const styles = {
  title: {
    cursor: 'pointer',
  },
};
const style = {
  button: {
    margin: 12,


  }

};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/Dashboard" component={Dashboard} />
          <Route exact path='/' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path="/RegisterDonor" component={Donor} />
        </div>
      </Router>

    );
  }
}

export default App;

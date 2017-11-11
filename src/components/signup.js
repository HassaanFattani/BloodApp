import React, { Component } from 'react';
import { TextField, RaisedButton, Paper, Divider } from 'material-ui';
import '../config/firebase.js';
import Navigation from './navigation';
import * as firebase from 'firebase'
import { red500, green500 } from 'material-ui/styles/colors';


const style = {
  height: 400,
  width: 400,
  margin: 120,

  display: 'inline-block',
  errorStyle: {
    color: red500,
  },
  underlineStyle: {
    borderColor: red500,
  },
  floatingLabelStyle: {
    color: red500,
  },
  floatingLabelFocusStyle: {
    color: red500,
  },
};




class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }

  }


  SignUp() {
    if (this.state.name === "" || this.state.email === "" || this.state.password === "") {
      alert("Please Fill All Fields");
    } else {
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      promise.then((value) => {
        if (value.uid != null) {
          alert("Sign Up Successfully")
          { this.props.history.push('/login') }
        }
      });
      promise.catch(e => alert(e.message));
    }
  }





  render() {
    return (


      <div className="App">
        <Navigation />
        <div>
          <Paper style={style} zDepth={3}>
            <h2 style={{ backgroundColor: red500, borderColor: red500, borderWidth: 0.5, color: "white" }}>SIGN UP</h2>
            <TextField
              floatingLabelText="Name"
              floatingLabelStyle={style.floatingLabelStyle}
              floatingLabelFocusStyle={style.floatingLabelFocusStyle}
              style={{ width: 360 }}
              underlineFocusStyle={style.underlineStyle}
              onChange={(event) => this.setState({
                name: event.target.value
              })}
            />
            <TextField
              floatingLabelText="Email Address"
              floatingLabelStyle={style.floatingLabelStyle}
              floatingLabelFocusStyle={style.floatingLabelFocusStyle}
              style={{ width: 360 }}
              underlineFocusStyle={style.underlineStyle}
              onChange={(event) => this.setState({
                email: event.target.value
              })}
            />
            <TextField
              floatingLabelText="Password"
              floatingLabelStyle={style.floatingLabelStyle}
              floatingLabelFocusStyle={style.floatingLabelFocusStyle}
              style={{ width: 360 }}
              type='password'
              underlineFocusStyle={style.underlineStyle}
              onChange={(event) => this.setState({ password: event.target.value })}
            /><br /><br /><br />
            <RaisedButton label="SIGN UP" style={style} onClick={this.SignUp.bind(this)} style={{ width: 300, height: 50, fontSize: 20, backgroundColor: 'red', color: 'red' }}
              labelStyle={{ fontSize: 20, color: "white" }} buttonStyle={{ backgroundColor: red500 }} />
          </Paper>
        </div>

      </div>
    );
  }
}

export default SignUp;


import React, { Component } from 'react'
import { TextField, RaisedButton, Paper, Checkbox } from 'material-ui';
import * as firebase from 'firebase';
import Navigation from './navigation';
import { red500, green500, red200 } from 'material-ui/styles/colors';

const style = {
    height: 365,
    width: 500,
    margin: 100,
    textAlign: 'center',
    display: 'inline-block',
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

    checkbox: {
        marginBottom: 16,
        color: red500,

    },
};

export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            userLogin: '',
            userPass: ''
        }

    }

    firstvalue(event) {
        this.setState({
            userLogin: event.target.value,

        })
    }

    secondval(pass) {
        this.setState({
            userPass: pass.target.value
        })
    }

    Login(event) {
        if (this.state.userLogin === "" || this.state.userPass === "") {
            alert("Please Fill All Fields");
        } else {
            const email = this.state.userLogin;
            const pass = this.state.userPass;
            const auth = firebase.auth();

            // Sign In
            const promise = auth.signInWithEmailAndPassword(email, pass)
            promise.then(e => {
                console.log(e);
                if (e.uid != null) {
                    alert('Login Successfully')
                    { this.props.history.push('/Dashboard') }
                }
            })
            promise.catch(e => {
                alert(e.message)
            });

            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    console.log(firebaseUser)
                }

            })
        }

    }
    render() {
        return (
            <div className="App">
                <Navigation />
                <Paper style={style} zDepth={3}>
                    <h2 style={{ backgroundColor: red500, borderColor: red500, borderWidth: 0.5, color: "white" }}>LOG IN</h2>
                    <TextField
                        floatingLabelText="Email Address"
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        style={{ width: 360 }}
                        underlineFocusStyle={style.underlineStyle}
                        onChange={this.firstvalue.bind(this)}
                    />
                    <TextField
                        floatingLabelText="Password"
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        style={{ width: 360 }}
                        type='password'
                        underlineFocusStyle={style.underlineStyle}
                        onChange={this.secondval.bind(this)}
                    /><br />
                    <Checkbox
                        label="Remember my password" style={{ marginLeft: 55, marginTop: 20, marginBottom: 30 }} labelStyle={{ color: red200, fontSize: 20, marginRight: 225 }}
                        iconStyle={{ color: red500, borderColor: "grey", fill: red500, marginLeft: 2 }}
                    />
                    <RaisedButton label="LOG IN" style={style} onClick={this.Login.bind(this)} style={{ width: 300, height: 50, fontSize: 20, backgroundColor: 'red', color: 'red' }}
                        labelStyle={{ fontSize: 20, color: "white" }} buttonStyle={{ backgroundColor: red500 }} />

                </Paper>
            </div>
        );
    }
}
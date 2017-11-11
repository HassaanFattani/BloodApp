import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { FlatButton, AppBar, RaisedButton, Drawer, TextField, Paper, Checkbox, MenuItem, SelectField } from 'material-ui';
import { red500, green500, red200, grey400 } from 'material-ui/styles/colors';
import * as MUI from 'material-ui'
import Web from 'material-ui/svg-icons/action/home';
import Save from 'material-ui/svg-icons/content/save';
// import styles from './donorRegisterStyle';

const items = [
    <MenuItem key={1} value={"Male"} primaryText="Male" />,
    <MenuItem key={2} value={"Female"} primaryText="Female" />,
];

const bloodGroupList = [
    <MenuItem key={1} value={"A+"} primaryText="A+" />,
    <MenuItem key={2} value={"O+"} primaryText="O+" />,
    <MenuItem key={3} value={"B+"} primaryText="B+" />,
    <MenuItem key={4} value={"AB+"} primaryText="AB+" />,
    <MenuItem key={5} value={"A-"} primaryText="A-" />,
    <MenuItem key={6} value={"O-"} primaryText="O-" />,
    <MenuItem key={7} value={"B-"} primaryText="B-" />,
    <MenuItem key={8} value={"AB-"} primaryText="AB-" />,
];

const stylying = {
    customWidth: {
        width: 150,
    },
};

const style = {
    labelStyle: {
        color: 'white'
    },
    height: 665,
    width: 500,
    margin: 45,
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
}
const styles = {
    registerDonorContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
    },
    toggleLabel: {
        color: grey400,
        fontWeight: 100
    },
    buttons: {
        marginTop: 30,
        float: 'right'
    },
    saveButton: {
        marginLeft: 5
    },
    paper: {
        padding: 30
    },
    clear: {
        clear: 'both'
    }
};

class Donor extends Component {
    reff = firebase.database().ref("BloodAppProject");
    constructor(props) {
        super();
        this.state = {
            open: false,
            firstName: "",
            lastName: "",
            Address: "",
            Contact: "",
            bloodGroup: "",
            Age: "",
            nameArray: {},
            gender: "",
            bloodGroupMatch: ""
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);

    }
    handleChangeInput(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log("E ", e.target.name);
        console.log("Y ", e.target.value);
    }
    SaveData(ev) {
        if (this.state.firstName === "" || this.state.lastName === "" || this.state.gender === "" || this.state.bloodGroup === "" || this.state.Contact === "" || this.state.Address === "" || this.state.Age === "") {
            alert("Please Fill All Fields");
        } else {
            var data = { firstName: this.state.firstName, lastName: this.state.lastName, gender: this.state.gender, bloodGroup: this.state.bloodGroup, Contact: this.state.Contact, Address: this.state.Address, Age: this.state.Age, bloodGroupMatch: this.state.bloodGroupMatch }
            this.reff.push(data);

            alert("Data Saved Successfully")
            this.setState({ firstName: "", lastName: "", gender: "", bloodGroup: "", Contact: "", Address: "", Age: "" })
        }
    }

    handleChange(event, index, value) {
        var match = "";
        if (value == "A+") {
            match = "A+,A-,O+,O-"
        }
        else if (value == "O+") {
            match = "O+,O-"
        }
        else if (value == "B+") {
            match = "B+,B-,O+,O-"
        }
        else if (value == "AB+") {
            match = "Everyone"
        }
        else if (value == "A-") {
            match = "A-,O-"
        }
        else if (value == "O-") {
            match = "O-"
        }
        else if (value == "B-") {
            match = "B-,O-"
        }
        else if (value == "AB-") {
            match = "AB-,A-,B-,O-"
        }

        this.setState({ bloodGroup: value, bloodGroupMatch: match });
        console.log("Blood Group", value)
        console.log("Blood Group Match", match)
    }
    handleChangeGender(event, index, value) {
        this.setState({ gender: value });
        console.log("Gender", value)
    }
    Logout() {
        firebase.auth().signOut();
        this.props.history.push("/")
    }
    handleToggle = () => this.setState({ open: !this.state.open });
    render() {
        return (
            <div className="App">
                <AppBar
                    onClick={this.handleToggle}
                    iconElementRight={<div> <RaisedButton label="log out" onClick={this.Logout.bind(this)} containerElement={<Link to='/' />} />

                    </div>
                    }

                    title="BLOOD BANK" titleStyle={{ fontWeight: "bold", fontFamily: "Times New Roman", textAlign: "center" }}
                    style={{ backgroundColor: red500 }}
                />
                <Drawer open={this.state.open} containerStyle={{ backgroundColor: red500 }} openSecondary={false}>
                    <AppBar title="Dashboard" style={{ backgroundColor: red500 }} />
                    <br />
                    <MUI.MenuItem
                        className="navigation-menuItem"
                        primaryText="Dashboard"
                        leftIcon={<Web />}
                        style={{ backgroundColor: "white", color: red500, fontWeight: "bold" }}
                        containerElement={<Link to="/Dashboard" />}
                    />
                    <br />
                </Drawer>
                <Paper style={style} zDepth={3}>
                    <h2 style={{ backgroundColor: red500, borderColor: red500, borderWidth: 0.5, color: "white" }}>REGISTER DONOR</h2>
                    <TextField
                        floatingLabelText="First Name"
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        style={{ width: 360 }}
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChangeInput}
                        underlineFocusStyle={style.underlineStyle}
                    />
                    <TextField
                        floatingLabelText="Last Name"
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        style={{ width: 360 }}
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChangeInput}
                        underlineFocusStyle={style.underlineStyle}
                    />
                    <SelectField
                        floatingLabelText="Gender"
                        style={{ width: 360, textAlign: "left" }}
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        underlineFocusStyle={style.underlineStyle}
                        value={this.state.gender}
                        onChange={this.handleChangeGender.bind(this)}
                    >
                        {items}
                    </SelectField>
                    <SelectField
                        floatingLabelText="Blood Group"
                        style={{ width: 360, textAlign: "left" }}
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        underlineFocusStyle={style.underlineStyle}
                        value={this.state.bloodGroup}
                        onChange={this.handleChange.bind(this)}
                    >
                        {bloodGroupList}
                    </SelectField>
                    <TextField
                        floatingLabelText="Contact No."
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        style={{ width: 360 }}
                        name="Contact"
                        value={this.state.Contact}
                        onChange={this.handleChangeInput}
                        underlineFocusStyle={style.underlineStyle}
                    />
                    <TextField
                        floatingLabelText="Address"
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        style={{ width: 360 }}
                        name="Address"
                        value={this.state.Address}
                        onChange={this.handleChangeInput}
                        underlineFocusStyle={style.underlineStyle}
                    />
                    <TextField
                        floatingLabelText="Age"
                        floatingLabelStyle={style.floatingLabelStyle}
                        floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        style={{ width: 360, marginBottom: 20 }}
                        name="Age"
                        value={this.state.Age}
                        onChange={this.handleChangeInput}
                        underlineFocusStyle={style.underlineStyle}
                    />
                    <br />
                    <RaisedButton label="Register" style={style} style={{ width: 300, height: 50, fontSize: 20, backgroundColor: 'red', color: 'red' }}
                        labelStyle={{ fontSize: 20, color: "white" }} buttonStyle={{ backgroundColor: red500 }} onClick={this.SaveData.bind(this)} />

                </Paper>

            </div>
        )
    }

}
export default Donor;   
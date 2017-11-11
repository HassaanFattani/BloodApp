import React, { Component } from 'react';
import { FlatButton, AppBar, Paper, RaisedButton, MenuItem, Drawer, SelectField, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { red500, green500, red200, red400 } from 'material-ui/styles/colors';
import * as MUI from 'material-ui'
import Web from 'material-ui/svg-icons/action/home';
import Save from 'material-ui/svg-icons/content/save';


const style = {
    labelStyle: {
        color: 'white'
    },
    height: "auto",
    width: 1300,
    margin: 50,

    textAlign: 'center',
    display: 'inline-block',
    underlineStyle: {
        borderColor: red500,
    },
    floatingLabelStyle: {
        color: red500,
    },
    floatingLabelFocusStyle: {
        color: red500,
    },
    customWidth: {
        width: 150,
    }
};
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

class Dashboard extends Component {
    reff = firebase.database().ref("BloodAppProject");
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            arr: [],
            matchCase : []
        }
    }
    handleChange(event, index, value) {
        //this.setState({arr: []})
        this.setState({ bloodGroup: value , matchCase:[]});

        //var match = [];
        if (value == "A+") {            
            this.state.matchCase.push("A+")
            this.state.matchCase.push("A-")
            this.state.matchCase.push("O+")
            this.state.matchCase.push("O-")
        }
        else if (value == "O+") {
            this.state.matchCase.push("O+")
            this.state.matchCase.push("O-")
            
        }
        else if (value == "B+") {
            this.state.matchCase.push("B+")
            this.state.matchCase.push("B-")
            this.state.matchCase.push("O+")
            this.state.matchCase.push("O-")
            //     match = "B+,B-,O+,O-"
        }
        else if (value == "AB+") {
            this.state.matchCase.push("A+")
            this.state.matchCase.push("O+")
            this.state.matchCase.push("B+")
            this.state.matchCase.push("AB+")
            this.state.matchCase.push("A-")
            this.state.matchCase.push("O-")
            this.state.matchCase.push("B-")
            this.state.matchCase.push("AB-")
            //     match = "Everyone"
        }
        else if (value == "A-") {
            this.state.matchCase.push("A-")
            this.state.matchCase.push("O-")
            //     match = "A-,O-"
        }
        else if (value == "O-") {
            this.state.matchCase.push("O-")
            //     match = "O-"
        }
        else if (value == "B-") {
            this.state.matchCase.push("B-")
            this.state.matchCase.push("O-")
            //     match = "B-,O-"
        }
        else if (value == "AB-") {
            this.state.matchCase.push("AB-")
            this.state.matchCase.push("A-")
            this.state.matchCase.push("B-")
            this.state.matchCase.push("O-")
            //     match = "AB-,A-,B-,O-"
        }
        const newData = [];
        for (var i = 0; i < this.state.matchCase.length; i++) {
            this.reff.orderByChild('bloodGroup')
                .equalTo(this.state.matchCase[i])
                .once('value')
                .then(function (snapshot) {
                    var value = snapshot.val();
                    snapshot.forEach(ChildSnapshot => {
                        var data = ChildSnapshot.val();
                        newData.push({
                            id: ChildSnapshot.key,
                            firstName: ChildSnapshot.val().firstName,
                            lastName: ChildSnapshot.val().lastName,
                            gender: ChildSnapshot.val().gender,
                            bloodGroup: ChildSnapshot.val().bloodGroup,
                            Contact: ChildSnapshot.val().Contact,
                            Address: ChildSnapshot.val().Address,
                            Age: ChildSnapshot.val().Age
                        })
                    })

                }).then(
                () => {
                    this.setState({ arr: newData })
                }

                )
        }
    }

    componentWillMount() {
        const newData = this.state.arr;

        // DataSnapshot
        this.reff.on('child_added', snap => {
            newData.push({
                id: snap.key,
                firstName: snap.val().firstName,
                lastName: snap.val().lastName,
                gender: snap.val().gender,
                bloodGroup: snap.val().bloodGroup,
                Contact: snap.val().Contact,
                Address: snap.val().Address,
                Age: snap.val().Age
            })

            this.setState({
                arr: newData
            })
        })

        console.log(newData)
    }
    handleToggle = () => this.setState({ open: !this.state.open });
    Logout() {
        firebase.auth().signOut();
        this.props.history.push("/")
    }
    render() {
        return (
            <div className="App">
                <AppBar
                    onClick={this.handleToggle}
                    iconElementRight={<div> <RaisedButton label="log out" onClick={this.Logout.bind(this)} containerElement={<Link to='/' />} />

                    </div>
                    }

                    title="BLOOD BANK" titleStyle={{ fontWeight: "bold", fontFamily: "Times New Roman" }}
                    style={{ backgroundColor: red500 }}
                />

                <Drawer open={this.state.open} containerStyle={{ backgroundColor: red500 }} openSecondary={false}>
                    <AppBar title="Dashboard" style={{ backgroundColor: red500 }} />

                    <br />
                    <MUI.MenuItem
                        className="navigation-menuItem"
                        primaryText="Donor Register"
                        leftIcon={<Save />}
                        style={{ backgroundColor: "white", color: red500, fontWeight: "bold" }}
                        containerElement={<Link to="/RegisterDonor" />}
                    />
                </Drawer>
                <Paper style={style} zDepth={3} >
                    <h2 style={{ backgroundColor: red500, borderColor: red500, borderWidth: 0.5, color: "white" }}>DONORS LIST</h2>
                    <div>
                        <div style={{ color: red500, borderColor: red400, borderStyle: "solid", borderWidth: 0.5, width: 500, margin: 10, marginLeft: 400 }}>
                            <h4 style={{ backgroundColor: red400, borderColor: red500, marginBottom: -15, borderWidth: 0.5, color: "white", width: 150 }}>SEARCH</h4>
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
                        </div>
                        <Table>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>First Name</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Last Name</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Gender</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Blood Group</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Contact No.</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Address</TableHeaderColumn>
                                    <TableHeaderColumn style={{ color: "white", backgroundColor: red500, fontWeight: "bold", fontSize: 13 }}>Age</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {this.state.arr.map((data, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.firstName}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.lastName}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.gender}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.bloodGroup}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.Contact}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.Address}</TableRowColumn>
                                            <TableRowColumn style={{ fontWeight: "bold", fontSize: 12 }}>{data.Age}</TableRowColumn>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </div>
                </Paper>

            </div>
        );

    }
}
export default Dashboard;
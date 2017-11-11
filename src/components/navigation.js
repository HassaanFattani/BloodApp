import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { FlatButton, RaisedButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { red500, green500 } from 'material-ui/styles/colors';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

class Navigation extends React.Component {
  render() {
    return (
      <AppBar

        title="BLOOD BANK" titleStyle={{ fontWeight: "bold", fontFamily: "Times New Roman", textAlign: "center" }}
        style={{ backgroundColor: red500 }}
        iconElementRight={<div> <RaisedButton label="Sign Up" containerElement={<Link to='/' />} />&nbsp;
        <RaisedButton label="Log In" containerElement={<Link to="/Login" />} />

        </div>
        }

      />

    );
  }
}


export default Navigation;
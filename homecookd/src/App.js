import React, { Component } from 'react';
import {Router, Route,Switch,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLogged } from './actions/account-actions';
import history from './Utils/history';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import AboutUs from './Scenes/AboutUs/AboutUs';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import './App.css';


const Routes = () => (
  <Router history = {history}>
    <div>
    <Switch>
    <Route exact path = "/" component = {HomePage} />
    <Route path = '/Login' component = {LoginForm}/>
    <Route path = '/Register' component = {RegisterForm} />
    <Route path = '/AboutUs' component = {AboutUs} />
    <Route path = '/MyAccount' component = {AccountPage}/>
    <Route  component={Error404} /> {/* 404 Route*/}

    </Switch>
    </div>
  </Router>
)

function handleClick(){
  // alert("TEST");
  this.props.history.push('/');
}

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} href="/login" label="Login" />
    );
  }
}

class LoggedInMenu extends Component {
  constructor(props){
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  handleSignOut = () => {
    localStorage.removeItem('api_token');
    this.logOutUser(false);
    alert("Signed Out");
  }
  logOutUser(data) {
    this.props.logOutUser(data);
  }

  render(){
    return(
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem onClick={this.handleSignOut} primaryText="Sign out" />
      </IconMenu>
    )
  }
};



class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      logged : (localStorage.getItem('api_token') !== null),
      open: false
    }

  }
  handleChange = (event, logged) => {
    this.setState({logged: logged});
  }

    return (

      <MuiThemeProvider>


      <AppBar
          title="HomeCookd"
          onTitleClick={handleClick}
          iconElementRight={this.state.logged ? <LoggedInMenu /> : <Login />}
          onLeftIconButtonClick={this.handleToggle}/>

          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onClick={this.handleClose} href="/#">Home</MenuItem>
            <MenuItem onClick={this.handleClose}>Order</MenuItem>
            <MenuItem onClick={this.handleClose} href="/Menu">Menu</MenuItem>
            <MenuItem onClick={this.handleClose}>Location</MenuItem>
            <MenuItem onClick={this.handleClose}>Refresh</MenuItem>
            <MenuItem onClick={this.handleClose} href="/AboutUs" >About Us</MenuItem>
            <MenuItem onClick={this.handleClose}>Help</MenuItem>


          </Drawer>

        <Routes/>

        </MuiThemeProvider>

          iconElementRight={this.props.logged ? <LoggedInMenu /> : <Login />}/>

        <Routes/>
      </MuiThemeProvider>


    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.logged
  };
};

const mapDispatchToProps = {
  logOutUser: changeLogged
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

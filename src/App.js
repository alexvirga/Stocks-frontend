import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/registrations/Login";
import Signup from "./components/registrations/Signup";
import "./App.css";
import Navbar from './components/Navbar'
import {UserContext} from './userContext';

// console.log(process.env.REACT_APP_API_KEY)

class App extends Component {
  state = {
    isLoggedIn: false,
    user: {}
  };

  componentDidMount() {
    this.loginStatus();
  }
  loginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.setState({
            user: response.data.user,
            isLoggedIn: true
      
          });
        } else {
          this.handleLogout();
        }
      })
      .catch(error => console.log("There has been a database error:", error));
  };

  handleLogin = data => {
    this.setState({
      user: data.user,
      isLoggedIn: true

    });
 
    
  };


  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    });
  };

  render() {
   
    return (
      <div>
        <UserContext.Provider value={this.state.user}>
        <BrowserRouter>
        {this.state.isLoggedIn ?
        <Navbar user={this.state.user} handleLogout={this.handleLogout} /> : null}
          <Switch>
            <Route
              exact
              path="/"
              render={props => ( 
                this.state.isLoggedIn ? 
                <Dashboard/> :
                <Home
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
                        <Route
              exact
              path="/dashboard"
              render={props => (
                
                <Dashboard
                user={this.state.user}/>
              
              )}
            />

            />

          </Switch>
        </BrowserRouter>
        </UserContext.Provider>
      </div>
    );
  }
}
export default App;

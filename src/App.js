import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/registrations/Login";
import Signup from "./components/registrations/Signup";
import "./App.css";

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
          this.handleLogin(response);
        } else {
          this.handleLogout();
        }
      })
      .catch(error => console.log("There has been a database error:", error));
  };

  handleLogin = data => {
    this.setState({
      isLoggedIn: true,
      user: data.user
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
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => ( 
                this.state.isLoggedIn ? 
                <Dashboard handleLogout={this.handleLogout} /> :
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
                <Dashboard />
              
              )}
            />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

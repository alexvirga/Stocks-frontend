import React, { Component } from "react";
import axios from "axios";
import { HashRouter, Route } from "react-router-dom";
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
      .get("https://fast-savannah-59172.herokuapp.com/logged_in", {
        withCredentials: true
      })
      .then(response => {
        if (response.data.logged_in) {
          this.setState({
            user: response.data.user,
            isLoggedIn: true
          });
          this.handleLogin(response.data);
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
      <div className="App">
        <HashRouter>
          <Route
            exact
            path="/"
            component={() =>
              this.state.isLoggedIn ? (
                <Dashboard
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              ) : (
                <Home
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )
            }
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
        </HashRouter>
      </div>
    );
  }
}
export default App;

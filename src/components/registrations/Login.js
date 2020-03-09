import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: ""
  };

  componentdidlMount() {
    return this.props.loggedInStatus ? this.redirect() : null;
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    let user = {
      email: email,
      password: password
    };
    axios
      .post(
        "https://fast-savannah-59172.herokuapp.com/login",
        { user },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data);
          this.redirect();
        } else {
          this.setState({
            errors: response.data.errors
          });
        }
      })
      .catch(error => console.log("api errors:", error));
  };
  redirect = () => {
    this.props.history.push("/");
  };

  handleErrors = () => {
    return (
      <div>
        {this.state.errors.map(error => {
          return <p key={error}>{error}</p>;
        })}
      </div>
    );
  };
  
  render() {
    const { email, password } = this.state;
    return (
      <div className="Login-Signup-Page">
        <div className="Homepage-background"></div>
        <div className="Registration-Container">
          <h1>Welcome Back</h1>
          <p> Log in to start trading</p>

          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="email"
              className="Registration-Input"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              className="Registration-Input"
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <button
              placeholder="submit"
              type="submit"
              className="btn"
              style={{ margin: "35px 0px 10px 0px" }}
            >
              <div className="box-1">
                <div className="btn btn-registration">
                  <span>Login</span>
                </div>
              </div>
            </button>

            <div>
              or <Link to="/signup">sign up</Link>
            </div>
          </form>
          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </div>
      </div>
    );
  }
}
export default Login;

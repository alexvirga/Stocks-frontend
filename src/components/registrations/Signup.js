import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, email, password, password_confirmation } = this.state;
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    };

    axios
      .post(
        "https://fast-savannah-59172.herokuapp.com/users",
        { user },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
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
    const { username, email, password, password_confirmation } = this.state;

    return (
      <div className="Login-Signup-Page">
        <div className="Homepage-background"></div>
        <div className="Registration-Container">
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="Registration-Input"
              placeholder="name"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              placeholder="email"
              className="Registration-Input"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              className="Registration-Input"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <input
              placeholder="password confirmation"
              type="password"
              className="Registration-Input"
              name="password_confirmation"
              value={password_confirmation}
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
                  <span>Sign Up</span>
                </div>
              </div>
            </button>

            <div>
              Already a user? <Link to="/login"> Log in </Link>
            </div>
          </form>
          <div>{this.state.errors ? this.handleErrors() : null}</div>
        </div>
      </div>
    );
  }
}
export default Signup;

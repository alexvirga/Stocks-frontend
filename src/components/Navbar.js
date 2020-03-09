import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

class Navbar extends Component {
  static contextType = UserContext;

  handleClick = () => {
    axios
      .delete("https://fast-savannah-59172.herokuapp.com/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  update() {
    axios
      .put(`https://fast-savannah-59172.herokuapp.com/users/${this.props.user.id}`, {
        balance: 4000
      })
      // .then(res => console.log(res.data))
      .catch(error => console.log("api errors:", error));
  }

  render() {
    // console.log(this.props.user)
    return (
      <div className="Navbar">
        <div className="Navbar-menu"> 
        
          <img src="pipe.png" className="pipe-logo-navbar" alt="" />
        
       
    

        <h2> Balance: ${this.props.balance} </h2>
       
        {/* <h4> {this.props.user.username}</h4> */}
        <Link to="/" onClick={this.handleClick}>
          Log Out
        </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;

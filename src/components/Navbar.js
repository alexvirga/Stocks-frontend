import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import {UserContext} from '../userContext';

class Navbar extends Component{

    static contextType = UserContext;

  handleClick = () => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  update() {
    axios.put(`http://localhost:3001/users/${this.props.user.id}`, {balance: 4000})
    // .then(res => console.log(res.data))
    .catch(error => console.log('api errors:', error))

}



  render() {
      // console.log(this.props.user)
  return (
    <div className="Navbar">
   <h1> {this.props.user.username}</h1>
   <h1> {this.props.balance} </h1>
  
        <Link to="/" onClick={this.handleClick}>
          Log Out
        </Link>
   
    </div>
  );
} }

export default Navbar;

import React, {Component} from 'react'
import axios from "axios";
import Login from "./registrations/Login"
import {Link} from 'react-router-dom'

class Dashboard extends Component {

  handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }

render() {

return (
      <div>
        <h1>Dashboard</h1>
        <Link to='/' onClick={this.handleClick}>Log Out</Link> 
      </div>
    );
  }
}
export default Dashboard;
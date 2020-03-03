import React, {Component} from 'react'
import axios from "axios";
import Login from "./registrations/Login"
import {Link} from 'react-router-dom'
import StockSearch from './StockSearch'
class Dashboard extends Component {





render() {
  

return (
      <div>
        <h1>Dashboard</h1>
        <StockSearch />
      </div>
    );
  }
}
export default Dashboard;
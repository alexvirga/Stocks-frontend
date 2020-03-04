import React, {Component} from 'react'
import axios from "axios";
import Login from "./registrations/Login"
import {Link} from 'react-router-dom'
import StockSearch from './StockSearch'
import ShowStock from './ShowStock'
class Dashboard extends Component {

  state = {
    selectedStock: []
  }

handleSearch = (data) => {
  this.setState({selectedStock: data})
}



render() {
  

return (
      <div className={"Dashboard"}>
        <h1>Dashboard</h1>
        <StockSearch handleSearch={this.handleSearch} />
        {this.state.selectedStock ? (
        <ShowStock stock={this.state.selectedStock} />
          ) : null}
      </div>
    );
  }
}
export default Dashboard;
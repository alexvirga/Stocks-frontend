import React, {Component, useContext} from 'react'
import StockSearch from './StockSearch'
import ShowStock from './ShowStock'
import axios from "axios";
import {UserContext} from '../userContext';



class Dashboard extends Component {

  static contextType = UserContext;


  state = {
    selectedStock: [],
    viewStock: false,
    user: {}
  }

componentDidMount(){
  axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        console.log(response)
        if (response.data.logged_in) {
          this.setState({
            user: response.data.user})}})
}


handleSearch = (data) => {
  this.setState({viewStock: true, selectedStock: data})
}



handlePurchase = async(price, user) => {

  let newBalance = this.state.user.balance - price
  const response = await axios
  .put(`http://localhost:3001/users/${user.id}`, {balance: newBalance})
  // .then(resp => console.log(resp.data))
  // .catch(error => console.log('api errors:', error))
  this.setState({user: response.data})
  console.log("response", response)

}




render() {





return (
  
      <div className={"Dashboard"}>
     
        
        <h1>Dashboard</h1>
        <h1> {this.state.user.balance} </h1>
        <StockSearch handleSearch={this.handleSearch} />
        {(this.state.viewStock) ? (
        <ShowStock stock={this.state.selectedStock} handlePurchase={this.handlePurchase} user={this.props.user}/>
          ) : null}
      </div>
    );
  }
}
export default Dashboard;
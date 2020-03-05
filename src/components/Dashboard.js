import React, {Component} from 'react'
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

  


handleSearch = (data) => {
  this.setState({viewStock: true, selectedStock: data})
}

handlePurchase(price) {
 
  // let newBalance = this.props.user.balance - price
  axios.put(`http://localhost:3001/users/${this.props.user.id}`, {balance: 4000})
  .then(res => console.log(res.data))
  .catch(error => console.log('api errors:', error))

}


render() {
  
console.log(this.context)

return (
      <div className={"Dashboard"}>
        
        <h1>Dashboard</h1>
        <StockSearch handleSearch={this.handleSearch} />
        {(this.state.viewStock) ? (
        <ShowStock stock={this.state.selectedStock} handlePurchase={this.handlePurchase}/>
          ) : null}
      </div>
    );
  }
}
export default Dashboard;
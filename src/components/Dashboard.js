import React, { Component, useContext } from "react";
import StockSearch from "./StockSearch";
import ShowStock from "./ShowStock";
import axios from "axios";
import { UserContext } from "../userContext";

class Dashboard extends Component {
  static contextType = UserContext;

  state = {
    selectedStock: [],
    viewStock: false,
    user: {}
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        
        if (response.data.logged_in) {
          this.setState({
            user: response.data.user
          });
        }
      });
  }

  handleSearch = data => {
    this.setState({ viewStock: true, selectedStock: data });
  };

  handlePurchase = async (price, user, qty, symbol) => {
    
    this.postStocktoLedger(price,user,qty,symbol)
    // let orderCost = price * qty;
    // let newBalance = this.state.user.balance - orderCost;
    // const response = await axios.put(`http://localhost:3001/users/${user.id}`, {
    //   balance: newBalance
    // });



    // // .then(resp => console.log(resp.data))
    // // .catch(error => console.log('api errors:', error))
    // this.setState({ user: response.data });
   
  };

  postStocktoLedger = (price, user, qty, symbol) => {
    // let purchasedStock = {
    //   stock: symbol,
    //   user: user.id,
    //   cost_per_share: price,
    //   quantity: qty
    // };
    console.log(user)
    axios
      .post("http://localhost:3001/trades", { 
      stock: symbol,
      user_id: user.id,
      cost_per_share: price,
      quantity: qty
       })
      .then(response => {
        if (response.data.status === "created") {
          console.log("created",response.data);
        } else {
          console.log(response);
        }
      });
  };

  render() {
    return (
      <div className={"Dashboard"}>
        <h1>Dashboard</h1>
        <h1> {this.state.user.balance} </h1>
        <StockSearch handleSearch={this.handleSearch} />
        {this.state.viewStock ? (
          <ShowStock
            stock={this.state.selectedStock}
            handlePurchase={this.handlePurchase}
            user={this.state.user}
          />
        ) : null}
      </div>
    );
  }
}
export default Dashboard;

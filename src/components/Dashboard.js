import React, { Component } from "react";
import StockSearch from "./StockSearch";
import ShowStock from "./ShowStock";
import axios from "axios";
import Transactions from "./Transactions";
import Portfolio from "./Portfolio";
import Navbar from "./Navbar";

class Dashboard extends Component {
  state = {
    selectedStock: [],
    viewStock: false,
    user: {},
    trades: [],
    stockArr: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({isLoading: true})
    axios
      .get(`http://localhost:3001/users/${this.props.user.id}`)
      .then(response =>
        this.setState({
          user: response.data,
          trades: response.data.trades,
          stockArr: response.data.trades.map(stock => stock.stock),
          isLoading: false
        })
      );
  }

  handleSearch = data => {
    this.setState({ viewStock: true, selectedStock: data });
  };

  handleStockPurchase = async user => {
    this.setState({ user: user.data, trades:user.data.trades, viewStock: false });
    console.log(user);
  };

  render() {


    
  


    return (
     
      <div className={"Dashboard"}>
        
      <Navbar user={this.state.user} handleLogout={this.props.handleLogout} balance={this.state.user.balance} />

        <h1>Dashboard</h1>

        <StockSearch handleSearch={this.handleSearch} />

        {this.state.viewStock ? (
          <ShowStock
            stock={this.state.selectedStock}
            handlePurchase={this.handleStockPurchase}
            user={this.props.user}
          />
        ) : null}

        {!this.state.isLoading ? 
        <div>
        <Transactions user={this.state.user} trades={this.state.trades}  />
        <Portfolio user={this.state.user} trades={this.state.trades} stockArr={this.state.stockArr} />  </div>: <h1> Loading</h1>}
      </div>
    );
  }
}
export default Dashboard;

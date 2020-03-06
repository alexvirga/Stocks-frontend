import React, { Component } from "react";
import StockSearch from "./StockSearch";
import ShowStock from "./ShowStock";
import axios from "axios";
import Transactions from "./Transactions";
import Portfolio from "./Portfolio";

class Dashboard extends Component {
  state = {
    selectedStock: [],
    viewStock: false,
    user: {},
    trades: [],
    stockArr: []
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

    let uniqueStockArray = [...new Set(this.state.stockArr)]
    let uniqueStockString = uniqueStockArray.toString()
    
  
    // let stockArr = []

    // this.state.isLoading ? 
    // this.state.trades.map(stock => stockArr.push(stock.stock))
    // let uniqueStockList= [...new Set(stockArr)].toString()
    // console.log(uniqueStockList) ): null

    return (
      <div className={"Dashboard"}>
        <h1>Dashboard</h1>

        <StockSearch handleSearch={this.handleSearch} />

        {this.state.viewStock ? (
          <ShowStock
            stock={this.state.selectedStock}
            handlePurchase={this.handleStockPurchase}
            user={this.props.user}
          />
        ) : null}

        <Transactions user={this.state.user} trades={this.state.trades}  />
        <Portfolio user={this.props.user} trades={this.state.trades} string={uniqueStockString} />
      </div>
    );
  }
}
export default Dashboard;

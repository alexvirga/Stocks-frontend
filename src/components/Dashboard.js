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
    isLoading: true,
    portfolioToggle: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
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
    this.setState({
      user: user.data,
      trades: user.data.trades,
      stockArr: user.data.trades.map(stock => stock.stock),
      viewStock: true
    });
    console.log(user);
  };

  render() {
    return (
      <div className={"Dashboard"}>
        <Navbar
          user={this.state.user}
          handleLogout={this.props.handleLogout}
          balance={this.state.user.balance}
        />

        <div className="Stock-Info-Container">
          <div className="Portfilio-Div">
            <h4> Portfolio</h4>
            <div class="btn-group">
              <button
                onClick={() => this.setState({ portfolioToggle: false })}
                className="toggle-button"
              >
                Equity
              </button>

              <button
                onClick={() => this.setState({ portfolioToggle: true })}
                className="toggle-button"
              >
                Stock Price
              </button>
            </div>

            {!this.state.isLoading ? (
              <Portfolio
                user={this.state.user}
                trades={this.state.trades}
                stockArr={this.state.stockArr}
                portfolioToggle={this.state.portfolioToggle}
              />
            ) : (
              <h1> Loading</h1>
            )}
          </div>

          <div className="StockSearch">
            <StockSearch handleSearch={this.handleSearch} />

            {this.state.viewStock ? (
              <ShowStock
                stock={this.state.selectedStock}
                handlePurchase={this.handleStockPurchase}
                user={this.state.user}
              />
            ) : null}
          </div>

          <div className="Transactions-Div">
            <h4> Transactions</h4>
            {!this.state.isLoading ? (
              <Transactions user={this.state.user} trades={this.state.trades} />
            ) : (
              <h1> Loading</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;

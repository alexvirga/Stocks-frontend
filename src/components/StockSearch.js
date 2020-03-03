import React, { Component } from "react";
import axios from "axios";
import ShowStock from './ShowStock'

class StockSearch extends Component {
  state = {
    ticker: "",
    selectedStock: []
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .get(
        `https://sandbox.iexapis.com/stable/stock/${this.state.ticker}/quote?token=Tpk_e49c5833ad894266a16bfa7a44bed4d6`
      )
      .then(
        response => {
          this.setState({ selectedStock: response.data });
        },
        error => {
          console.log(error);
        }
      );
  };

  handleChange = event => {
    this.setState({ ticker: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Ticker"
            type="text"
            name="ticker"
            value={this.state.ticker}
            onChange={this.handleChange}
          />
          <button placeholder="submit" type="submit">
            Search
          </button>
          {this.state.selectedStock ? 
          <ShowStock stock={this.state.selectedStock}/> : null }
        </form>
      </div>
    );
  }
}

export default StockSearch;

import React, { Component } from "react";
import axios from "axios";
import ShowStock from "./ShowStock";

class StockSearch extends Component {
  state = {
    ticker: "",
    search: []
  };

  handleSubmit = symbol => {
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_API_KEY}`
      )
      .then(
        response => {
          this.props.handleSearch(response.data);
          this.setState({ search: "" });
        },
        error => {
          console.log(error);
        }
      );
  };

  handleChange = event => {
    this.setState({ ticker: event.target.value });

    axios
      .get(
        // `https://cloud.iexapis.com/stable/stock/${this.state.ticker}/quote?token=${process.env.REACT_APP_API_KEY}`
        `https://sandbox.iexapis.com/stable/search/${event.target.value}?token=Tsk_b220f21891584710a33a3e2ca16f2c8e`
      )
      .then(
        response => {
          this.setState({ search: response.data });
        },
        error => {
          this.setState({ search: [] });
        }
      );
  };

  handleClick = symbol => {
    this.setState({ ticker: symbol });
    this.handleSubmit(symbol);
  };

  render() {
    return (
      <div>
        <input
          placeholder="Ticker"
          type="text"
          name="ticker"
          value={this.state.ticker}
          onChange={this.handleChange}
        />
        {/* <button placeholder="submit" type="submit">
            Search
          </button> */}

        {this.state.search ? (
          <div className={"SearchBar"}>
            {this.state.search.slice(0, 5).map(suggestion => (
              <p
                key={suggestion.symbol}
                onClick={() => this.handleClick(suggestion.symbol)}
              >
                {suggestion.symbol}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default StockSearch;

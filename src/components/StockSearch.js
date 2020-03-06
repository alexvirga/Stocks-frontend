import React, { Component } from "react";
import axios from "axios";

class StockSearch extends Component {
  state = {
    ticker: "",
    search: [],
    isSearching: false
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
          this.setState({ isSearching: true, search: response.data });
        },
        error => {
          this.setState({ isSearching: false, search: [] });
        }
      );
  };

  handleClick = symbol => {
    this.setState({ isSearching: false, ticker: ""});
    this.handleSubmit(symbol);
  };

  render() {
    return (
      <div className={"Stock-Search-Container"}>
        <input
        className={"SearchInput"}
          placeholder="Search Ticker"
          type="text"
          name="ticker"
          value={this.state.ticker.toUpperCase()}
          onChange={this.handleChange}
          autofocus
        />

        {this.state.isSearching ? (
          <div className={"SearchBar"}>
            <h4> STOCKS </h4>
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

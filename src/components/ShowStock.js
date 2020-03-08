import React, { Component } from "react";
import axios from "axios";

class ShowStock extends Component {
  state = {
    shareQty: 0,
    errors: [],
    error: ""
  };

  performance = () => {
    if (this.props.stock.change < 0) {
      return "Stock-Down";
    } else return "Stock-Up";
  };

  buttonColor = () => {
    if (this.props.stock.change < 0) {
      return "rgb(255, 127, 127)";
    } else if (this.props.stock.change > 0) {
      return "#2fe7a5";
    } else if ((this.props.stock.change = 0)) {
      return "rgb(183, 176, 176)";
    }
  };

  handleQtyChange = e => {
    this.setState({ shareQty: e.target.value });
  };

  handlePurchase = async (price, user, qty, symbol) => {
    let orderCost = price * qty;
    let newBalance = this.props.user.balance - orderCost;

    await axios
      .put(`http://localhost:3001/users/${user.id}`, {
        balance: newBalance
      })
      .then(response => {
        if (response) {
          this.props.handlePurchase(response);
          console.log("created purchase resp", response);
        } else {
          this.setState({ errors: response.data.errors });
        }
      });
  };

  postStocktoLedger = (price, user, qty, symbol) => {
    let orderCost = price * qty;
    let newBalance = this.props.user.balance - orderCost;
    if (newBalance < 0) {
      this.setState({
        error: "You don't have enough cash for this transaction"
      });
    } else {
      console.log(user);
      axios
        .post("http://localhost:3001/trades", {
          stock: symbol,
          user_id: user.id,
          cost_per_share: price,
          quantity: qty
        })
        .then(response => {
          if (response.data.status === "created") {
            this.handlePurchase(price, user, qty, symbol);
            console.log("created", response.data);
          } else {
            this.setState({ errors: response.data.errors });
            console.log("created", response.data.errors);
          }
        });
    }
  };

  handleErrors = () => {
    return (
      <div>

        {this.state.errors.map(error => {
          return <p key={error}>{error}</p>;
        })}
      </div>
    );
  };

  render() {
    let percentChange = this.props.stock.changePercent
      ? `(${(this.props.stock.changePercent * 100).toFixed(2)}%)`
      : null;
    let dollarChange = this.props.stock.change
      ? `$${this.props.stock.change.toFixed(2)}`
      : null;

    return (
      <div className={"StockView"}>
        {/* <div className={"Close-Button"} onClick={this.props.closeStock}>x</div> */}
        <h3> {this.props.stock.symbol} </h3>
        <p> {this.props.stock.companyName} </p>
        <h2> ${this.props.stock.latestPrice} </h2>
        <p className={this.performance()}>
          {dollarChange}
          {"   "} {percentChange}
        </p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3> Share Qty: </h3>
          <input
            className="Qty-Input"
            type="number"
            style={{ alignSelf: "center", textDecoration: "none" }}
            onChange={this.handleQtyChange}
          ></input>
        </div>

        <button
          className="button"
          style={{
            verticalAlign: "middle",
            backgroundColor: this.buttonColor()
          }}
          onClick={() =>
            this.postStocktoLedger(
              this.props.stock.latestPrice,
              this.props.user,
              this.state.shareQty,
              this.props.stock.symbol
            )
          }
        >
          <span>Buy </span>
        </button>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    );
  }
}

export default ShowStock;

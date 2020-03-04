import React, { Component } from "react";
import axios from "axios";

class ShowStock extends Component {

 performance = () => {
     if (this.props.stock.change < 0){
         return "Stock-Down"
     }
     else return "Stock-Up"
    }
    
  render() {

    let percentChange = this.props.stock.changePercent ? `(${(this.props.stock.changePercent * 100).toFixed(2)}%)` : null
    let dollarChange = this.props.stock.change ? `$${(this.props.stock.change).toFixed(2)}` : null


    return (

      <div className={"StockView"}>
        <h3> {this.props.stock.symbol} </h3>
        <h2> {this.props.stock.latestPrice} </h2>
        <p className={this.performance()}> {dollarChange} {percentChange} </p>
      </div>
  
    );
  }
}

export default ShowStock;

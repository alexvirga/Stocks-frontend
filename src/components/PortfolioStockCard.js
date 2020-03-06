import React, { Component } from "react";
import {UserContext} from '../userContext';


class PortfolioStockCard extends Component {
    state = {shareQty: 0}

    static contextType = UserContext;



 performance = () => {
     if (this.props.stock.change < 0){
         return "Stock-Down"
     }
     else return "Stock-Up"
    }



    
  render() {
    //   console.log(this.props.currentPrice)

    // let percentChange = this.props.stock.changePercent ? `(${(this.props.stock.changePercent * 100).toFixed(2)}%)` : null
    // let dollarChange = this.props.stock.change ? `$${(this.props.stock.change).toFixed(2)}` : null


    return (
    
      <div className={"StockView"}>
        <h4> {this.props.stock.stock} </h4>
            <h4> {this.props.stock.quantity} </h4>
            <h4> {this.props.stock.value} </h4>
      </div>
  
    );
  }
}

export default PortfolioStockCard;

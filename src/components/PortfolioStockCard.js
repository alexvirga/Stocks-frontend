import React, { Component } from "react";



class PortfolioStockCard extends Component {
    state = {shareQty: 0}

 



//  performance = () => {
//      if (this.props.stock.change < 0){
//          return "Stock-Down"
//      }
//      else return "Stock-Up"
//     }



    
  render() {
    //   console.log(this.props.currentPrice)

    // let percentChange = this.props.stock.changePercent ? `(${(this.props.stock.changePercent * 100).toFixed(2)}%)` : null
    // let dollarChange = this.props.stock.change ? `$${(this.props.stock.change).toFixed(2)}` : null


    return (
    
    
      <div className={"StockView"}>
          {this.props.stocks ? 
         <div> 
            <h4> {this.props.stocks.stock} </h4>
            <h4> {this.props.stocks.quantity} </h4>
            <h4> {this.props.stocks.value} </h4>
            </div> : <h1> loading </h1>}
      </div>
  
    );
  }
}

export default PortfolioStockCard;

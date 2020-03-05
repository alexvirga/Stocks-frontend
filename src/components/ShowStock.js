import React, { Component } from "react";
import {UserContext} from '../userContext';


class ShowStock extends Component {
    state = {shareQty: 0}

    static contextType = UserContext;



 performance = () => {
     if (this.props.stock.change < 0){
         return "Stock-Down"
     }
     else return "Stock-Up"
    }

    handleQtyChange = (e) => {
        this.setState({shareQty: e.target.value})
    }


    
  render() {

    let percentChange = this.props.stock.changePercent ? `(${(this.props.stock.changePercent * 100).toFixed(2)}%)` : null
    let dollarChange = this.props.stock.change ? `$${(this.props.stock.change).toFixed(2)}` : null


    return (
    
      <div className={"StockView"}>
        <h3> {this.props.stock.symbol} </h3>
        <h2> {this.props.stock.latestPrice} </h2>
        <p className={this.performance()}> {dollarChange} {percentChange} </p>
        <div style={{display:"flex", flexDirection:"row"}}>
        <h3> Shares </h3>
        <input type="text"  style={{alignSelf: "center"}} onChange={this.handleQtyChange}></input>
        </div>
        
        <button onClick={() => this.props.handlePurchase(this.props.stock.latestPrice, this.props.user, this.state.shareQty, this.props.stock.symbol)}> Buy something </button>
      </div>
  
    );
  }
}

export default ShowStock;

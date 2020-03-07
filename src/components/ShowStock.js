import React, { Component } from "react";
import axios from "axios";

class ShowStock extends Component {
    state = {
      shareQty: 0}





 performance = () => {
     if (this.props.stock.change < 0){
         return "Stock-Down"
     }
     else return "Stock-Up"
    }

    handleQtyChange = (e) => {
        this.setState({shareQty: e.target.value})
    }

    handlePurchase = async (price, user, qty, symbol) => {
      this.postStocktoLedger(price,user,qty,symbol)
      let orderCost = price * qty;
      let newBalance = this.props.user.balance - orderCost;
      await axios.put(`http://localhost:3001/users/${user.id}`, {
        balance: newBalance
      })
      .then( response =>
        this.props.handlePurchase(response))

      // this.props.handlePurchase({ response }))
      .catch(error => console.log('api errors:', error))
  
      // .then(resp => console.log(resp.data))
      // .catch(error => console.log('api errors:', error))

     
    };

    postStocktoLedger = (price, user, qty, symbol) => {
      console.log(user)
      axios
        .post("http://localhost:3001/trades", { 
        stock: symbol,
        user_id: user.id,
        cost_per_share: price,
        quantity: qty
         })
        .then(response => {
          if (response.data.status === "created") {
            console.log("created",response.data);
         
          } else {
            console.log(response);
          }
        });
    };


    
  render() {

    let percentChange = this.props.stock.changePercent ? `(${(this.props.stock.changePercent * 100).toFixed(2)}%)` : null
    let dollarChange = this.props.stock.change ? `$${(this.props.stock.change).toFixed(2)}` : null


    return (
    
      <div className={"StockView"}>
        {/* <div className={"Close-Button"} onClick={this.props.closeStock}>x</div> */}
        <h3> {this.props.stock.symbol} </h3>
        <h2> {this.props.stock.latestPrice} </h2>
        <p className={this.performance()}> {dollarChange} {percentChange} </p>
        <div style={{display:"flex", flexDirection:"row"}}>
        <h3> Shares </h3>
        <input type="number"  style={{alignSelf: "center"}} onChange={this.handleQtyChange}></input>
        </div>
        
        <button onClick={() => this.handlePurchase(this.props.stock.latestPrice, this.props.user, this.state.shareQty, this.props.stock.symbol)}> Buy something </button>
      </div>
  
    );
  }
}

export default ShowStock;

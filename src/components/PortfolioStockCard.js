import React, { Component } from "react";



class PortfolioStockCard extends Component {
  // performance = () => {
  //   if (this.props.stock.change < 0){
  //       return "Portfolio-Stock-Down"
  //   }
  //   else return "Portfolio-Stock-Up"
  //  }

  //  handleQtyChange = (e) => {
  //      this.setState({shareQty: e.target.value})
  //  }

 







    
  render() {



    return (
     
 
        <div key={this.props.trade.stock} className="Transaction">
          <h4> {this.props.trade.stock} - </h4>

          <h4 style={{ fontWeight: "normal" }}>
            {" "}
            {this.props.trade.quantity} Share(s) Cost: ${this.props.trade.value}
          </h4>
          <h4> Current Price: {this.props.liveData[this.props.trade.stock]['quote'].latestPrice} </h4>
          

  
      
     
    </div>

    
    
    )
}
}

export default PortfolioStockCard;

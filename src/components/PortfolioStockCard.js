import React, { Component } from "react";

class PortfolioStockCard extends Component {
  performance = () => {
    if (this.props.liveData.change < 0) {
      return "Portfolio-Stock-Down";
    } else if (this.props.liveData.change > 0) {
      return "Portfolio-Stock-Up";
    } else if ((this.props.liveData.change = 0)) {
      return "Portfolio-Stock-Equal";
    }
  };

  render() {
    return (
      
<div>
        <div key={this.props.trade.stock} className={"Portfolo-Stock-Card"}>
          <span style={{display:"flex", flexDirection:"column", textAlign: "left"}}>
          <h4> {this.props.trade.stock} </h4>


          <h4 style={{ fontWeight: "normal" }}>
            {this.props.trade.quantity} Share(s)
          </h4>
          </span>

          <span style={{display:"flex", flexDirection:"column", textAlign: "right"}}>
          <span className={this.performance()}><h4> ${this.props.liveData.latestPrice} </h4> </span>
          <h4 style={{ fontWeight: "normal" }}> {(this.props.liveData.changePercent * 100).toFixed(2)}%</h4>

          </span>
         
          
        </div>
         <hr/>
         </div>
      
    );
  }
}

export default PortfolioStockCard;

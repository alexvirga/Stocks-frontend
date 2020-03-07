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
      <div className="Portfolo-Stock-Card">
        <div key={this.props.trade.stock} className={this.performance()}>
          <h4> {this.props.trade.stock} - </h4>

          <h4 style={{ fontWeight: "normal" }}>
            {" "}
            {this.props.trade.quantity} Share(s) Cost: ${this.props.trade.value}
          </h4>
          <h4> Current Price: {this.props.liveData.latestPrice} </h4>
        </div>
      </div>
    );
  }
}

export default PortfolioStockCard;

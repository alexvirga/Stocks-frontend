import React, { Component } from "react";

class PortfolioStockCard extends Component {
  latestPricePerformance = () => {
    let priceChangeToday = this.props.liveData.change
    if (priceChangeToday < 0) {
      return "Portfolio-Stock-Down";
    } else if (priceChangeToday > 0) {
      return "Portfolio-Stock-Up";
    } else if (priceChangeToday === 0) {
      return "Portfolio-Stock-Equal";
    }
  };

  equityPerformance = () => {
    let currentEquityValue = this.props.liveData.latestPrice * this.props.trade.quantity;
    let totalStockCost = this.props.trade.value;
    if (currentEquityValue < totalStockCost) {
      return "Portfolio-Stock-Down";
    } else if (currentEquityValue > totalStockCost) {
      return "Portfolio-Stock-Up";
    } else if (currentEquityValue === totalStockCost) {
      return "Portfolio-Stock-Equal";
    }
  };

  render() {
    return (
      <div>
        {this.props.portfolioToggle ? (
          <div key={this.props.trade.stock} className={"Portfolo-Stock-Card"}>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left"
              }}
            >
              <h4> {this.props.trade.stock} </h4>

              <h4 style={{ fontWeight: "normal" }}>
                {this.props.trade.quantity} Share(s)
              </h4>
            </span>

            <span
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right"
              }}
            >
              <span className={this.latestPricePerformance()}>
                <h4> ${this.props.liveData.latestPrice} </h4>{" "}
              </span>
              <h4 style={{ fontWeight: "normal" }}>
                {" "}
                {(this.props.liveData.changePercent * 100).toFixed(2)}%
              </h4>
            </span>
          </div>
        ) : (
          <div key={this.props.trade.stock} className={"Portfolo-Stock-Card"}>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left"
              }}
            >
              <h4> {this.props.trade.stock} </h4>

              <h4 style={{ fontWeight: "normal" }}>
                {this.props.trade.quantity} Share(s)
              </h4>
            </span>

            <span
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "right"
              }}
            >
              <span className={this.equityPerformance()}>
                <h4>
                  {" "}
                  $
                  {(
                    this.props.liveData.latestPrice * this.props.trade.quantity
                  ).toFixed(2)}{" "}
                </h4>
              </span>

              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center"
                }}
              >
                <p> Cost: </p>
                &nbsp;&nbsp;
                <h4>${this.props.trade.value.toFixed(2)} </h4>
              </span>
              {/* <h4 style={{ fontWeight: "normal" }}>
                {" "}
                {(this.props.liveData.changePercent * 100).toFixed(2)}%
              </h4> */}
            </span>
          </div>
        )}
        <hr />
      </div>
    );
  }
}

export default PortfolioStockCard;

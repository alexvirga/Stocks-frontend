import React, { Component } from "react";

class Transactions extends Component {
  render() {
    return (
      <div className="Transactions-Container">
        {this.props.trades.map(trade => (
          <div key={trade.id} className="Transaction">
            <h4> {trade.stock} </h4>

            <h4 style={{ fontWeight: "normal" }}>
              {trade.quantity} Share(s) @ ${trade.cost_per_share}
            </h4>
          </div>
        ))}
      </div>
    );
  }
}

export default Transactions;

import React, { Component } from "react";
import axios from "axios";

class Transactions extends Component {
  state = {
    user: {},
    trades: []
  };

  // componentDidMount() {
  //     console.log(this.props.user)

  //     axios
  //       .get(`http://localhost:3001/users/${this.props.user.id}`,)
  //       .then(response => {
  //           console.log("transactions", response)

  //         // if (response.data.logged_in) {
  //         //   this.setState({
  //         //     user: response.data.user
  //         //   });
  //         // }
  //       });
  //   }

  componentDidMount() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          axios
            .get(`http://localhost:3001/users/${response.data.user.id}`)
            .then(response =>
              this.setState({
                user: response.data,
                trades: response.data.trades
              })
            );
        }
      });
  }

  render() {
    return (
      <div className="Transactions-Container">
        {this.state.trades.map(trade => (
          <div key={trade.id} className="Transaction">
            <h4> {trade.stock} - </h4>

            <h4 style={{ fontWeight: "normal" }}>
              {" "}
              {trade.quantity} Share(s) @ ${trade.cost_per_share}
            </h4>
          </div>
        ))}
      </div>
    );
  }
}

export default Transactions;

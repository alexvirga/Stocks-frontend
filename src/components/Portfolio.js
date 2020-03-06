import React, { Component } from "react";
import axios from "axios";
import PortfolioStockCard from "./PortfolioStockCard"

class Portfolio extends Component {
  state = {
    user: {},
    stocks: [],
    stockMap: {},
    stockArr: [],
    liveData: [],
    isLoading: false
  };

//   componentDidMount() {
      
//     // this.handlestocks()
//     this.fetchPrices()

//   }

    

 

  fetchPrices = () => {
    // axios
    // .get(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${input}&types=quote&range=1m&last=5&token=Tsk_b220f21891584710a33a3e2ca16f2c8e`)
    // .then(response => this.setState({liveData: response.data, isLoading: false}))


  }

//   handlestocks(stocks) {
//     //   console.log(stocks)
//     let stockMap = {};
//     let stockArr = [];
//     for (let i = 0; i < stocks.length; i++) {
//       if (stockMap[stocks[i].stock]) {
//         let objIndex = stockArr.findIndex(obj => obj.stock === stocks[i].stock);
//         stockArr[objIndex].quantity =
//           stockArr[objIndex].quantity + stocks[i].quantity;
//         stockArr[objIndex].value =
//           stockArr[objIndex].value +
//           stocks[i].cost_per_share * stocks[i].quantity;
//         stockMap[stocks[i].stock] += stocks[i].quantity;
//       } else {
//         stockArr.push({
//           stock: stocks[i].stock,
//           quantity: stocks[i].quantity,
//           value: stocks[i].cost_per_share * stocks[i].quantity
//         });
//         stockMap[stocks[i].stock] = stocks[i].quantity;
//       }
//     }
//     this.setState({ stockArr: stockArr });
//     console.log(stockArr);
//   }

  render() {
      console.log(this.props.string)



// let price = this.state.isLoading ? null : this.state.isLoading

    
    return (
      <div className="Transactions-Container">
        {/* {this.state.stockArr.map(stock => (
            <PortfolioStockCard stock={stock} />
        ))} */}
      </div>
    );
  }
}

export default Portfolio;

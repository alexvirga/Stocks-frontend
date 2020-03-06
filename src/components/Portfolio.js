import React, { Component } from "react";
import axios from "axios";


class Portfolio extends Component {
  state = {
    user: {},
    stocks: [],
    stockMap: {},
    stockArr: [],
    liveData: [],
    isLoading: false
  };


      
componentDidMount(){
    this.handlestocks(this.props.trades)
    this.fetchPrices(this.props.stockArr)
}

componentDidUpdate(prevProps) {
    if(prevProps.stockArr !== this.props.stockArr){
        this.handlestocks(this.props.trades)
        // this.fetchPrices(this.props.stockArr)
    }
}





  fetchPrices = (stockArr) => {
        this.setState({isLoading: true})
        let uniqueStockArray = [...new Set(stockArr)]
        let uniqueStockString = uniqueStockArray.toString()
        // console.log(uniqueStockString)
        // setInterval(() => {
        axios
        .get(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${uniqueStockString}&types=quote&range=1m&last=5&token=Tsk_b220f21891584710a33a3e2ca16f2c8e`)
        .then(response => this.setState({liveData: response.data, isLoading: false}),
        // error => {console.log(error)}
        )

    //   },100000)

   


  }

  handlestocks = (stocks) => {
    
      console.log("stocksssss", stocks)
    let stockMap = {};
    let stockArr = [];
    for (let i = 0; i < stocks.length; i++) {
      if (stockMap[stocks[i].stock]) {
        let objIndex = stockArr.findIndex(obj => obj.stock === stocks[i].stock);
        stockArr[objIndex].quantity =
          stockArr[objIndex].quantity + stocks[i].quantity;
        stockArr[objIndex].value =
          stockArr[objIndex].value +
          stocks[i].cost_per_share * stocks[i].quantity;
        stockMap[stocks[i].stock] += stocks[i].quantity;
      } else {
        stockArr.push({
          stock: stocks[i].stock,
          quantity: stocks[i].quantity,
          value: stocks[i].cost_per_share * stocks[i].quantity
        });
        stockMap[stocks[i].stock] = stocks[i].quantity;
      }
    }
    this.setState({ stockArr: stockArr });
    // console.log(stockArr);
  }

render() {

  
    


    
    return (
       
        
        <div className="Portfolio-Container">
        {this.state.stockArr ? 
        this.state.stockArr.map(trade => 
          <div key={trade.stock} className="Transaction">
            <h4> {trade.stock} - </h4>

            <h4 style={{ fontWeight: "normal" }}>
              {" "}
              {trade.quantity} Share(s) Cost: ${trade.value}
            </h4>
            {!this.state.isLoading ? <p> Current Price: {this.state.liveData[trade.stock]['quote'].latestPrice} </p>: null }
            

          </div>)
           : null
        }
        <h1> {this.props.user.balance} </h1>
      </div>
    
        
      
    //   <div className="Transactions-Container">
    //       {this.props.user.trades ? this.props.user.trades.map(trade => console.log(trade.stock)) : null}
          
          
         

    //   </div>
    )
  }
}

export default Portfolio;

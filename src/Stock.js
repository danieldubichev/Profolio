import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            theSymbol: ""
        }
    }

    componentDidMount(){
        this.fetchStock();

    }

    fetchStock(){
        
        const pointerToThis = this;
        const API_KEY = " KJS62RNVWTXO1GRX";
        let StockSymbol = "AMZN";
        
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        fetch(API_Call)
            .then(
                function(response){
                    return response.json();
                }
            )
            .then(
                function(data){
                    console.log(data);
                    for (var key in data["Time Series (Daily)"]){
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)']
                        [key]['5. adjusted close']);
                    }
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                        theSymbol: StockSymbol
                    });
                }
            )
    }

    render(){
        return (
            <div>
                <h1> Stock market </h1>
                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    ]}
                    layout={ {width: 720, height: 440, title: `${this.state.theSymbol}`} }
                />
            </div>
        )
    }
}
export default Stock;

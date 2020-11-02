import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stockChartXValuesIntraday: [],
            stockChartYValuesIntraday: [],
            stockChartXValuesWeeklyAdjust: [],
            stockChartYValuesWeeklyAdjust: [],
            stockChartXValuesMonthlyAdjust: [],
            stockChartYValuesMonthlyAdjust: [],
            theSymbol: "",
            labelOne: "Daily Adjusted Time Series",
            labelTwo: "Intraday Change",
            labelThree: "Weekly Adjusted Time Series",
            labelFour: "Monthly Adjusted Time Series",
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitName = this.handleSubmitName.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmitName(event) {
        
        //alert('A name was submitted: ' + this.state.value);
        this.fetchStockDailyAdjusted();
        this.fetchStockIntradayHistory();
        this.fetchStockWeeklyAdjusted();
        this.fetchStockMonthlyAdjusted();
        event.preventDefault();
        
      }

    componentDidMount(){
        //this.fetchStock();
    }

    fetchStockDailyAdjusted(){
        
        const pointerToThis = this;
        const API_KEY = " KJS62RNVWTXO1GRX";
        let StockSymbol = this.state.value;
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
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['5. adjusted close']);
                    }
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                        theSymbol: StockSymbol
                    });
                }
            )
    }
    fetchStockWeeklyAdjusted(){
        
        const pointerToThis = this;
        const API_KEY = " KJS62RNVWTXO1GRX";
        let StockSymbol = this.state.value;
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${StockSymbol}&apikey=${API_KEY}`;
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
                    for (var key in data["Weekly Adjusted Time Series"]){
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Weekly Adjusted Time Series'][key]['5. adjusted close']);
                    }
                    pointerToThis.setState({
                        stockChartXValuesWeeklyAdjust: stockChartXValuesFunction,
                        stockChartYValuesWeeklyAdjust: stockChartYValuesFunction,
                        theSymbol: StockSymbol
                    });
                }
            )
    }
    fetchStockMonthlyAdjusted(){
        
        const pointerToThis = this;
        const API_KEY = " KJS62RNVWTXO1GRX";
        let StockSymbol = this.state.value;
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${StockSymbol}&apikey=${API_KEY}`;
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
                    for (var key in data["Monthly Adjusted Time Series"]){
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Monthly Adjusted Time Series'][key]['5. adjusted close']);
                    }
                    pointerToThis.setState({
                        stockChartXValuesMonthlyAdjust: stockChartXValuesFunction,
                        stockChartYValuesMonthlyAdjust: stockChartYValuesFunction,
                        theSymbol: StockSymbol
                    });
                }
            )
    }
    fetchStockIntradayHistory(){
        
        const pointerToThis = this;
        const API_KEY = " KJS62RNVWTXO1GRX";
        let StockSymbol = this.state.value;
        
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${StockSymbol}&interval=5min&outputsize=full&apikey=${API_KEY}`;
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
                    for (var key in data["Time Series (5min)"]){
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (5min)'][key]['4. close']);
                    }
                    pointerToThis.setState({
                        
                        stockChartXValuesIntraday: stockChartXValuesFunction,
                        stockChartYValuesIntraday: stockChartYValuesFunction,
                        theSymbol: StockSymbol
                    });
                }
            )
    }



    render(){
        return (
            <div>
                <h1> Please enter a ticker </h1>
                
                <form onSubmit={this.handleSubmitName}>
                        <label>
                            
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                </form>
                <h2>{this.state.theSymbol} </h2>
                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValues,
                        y: this.state.stockChartYValues,
                        type: 'box',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    ]}
                    //layout={ {width: 720, height: 440, title: `${this.state.theSymbol}`} }
                    layout={ {width: 720, height: 440, title: `${this.state.labelOne}`} }
                />

                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValuesIntraday,
                        y: this.state.stockChartYValuesIntraday,
                        type: 'box',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    ]}
                    layout={ {width: 720, height: 440, title: `${this.state.labelTwo}`} }
                />

                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValuesWeeklyAdjust,
                        y: this.state.stockChartYValuesWeeklyAdjust,
                        type: 'box',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    ]}
                    layout={ {width: 720, height: 440, title: `${this.state.labelThree}`} }
                />

                <Plot
                    data={[
                    {
                        x: this.state.stockChartXValuesMonthlyAdjust,
                        y: this.state.stockChartYValuesMonthlyAdjust,
                        type: 'box',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    ]}
                    layout={ {width: 720, height: 440, title: `${this.state.labelFour}`} }
                />
            </div>
        )
    }
}
export default Stock;

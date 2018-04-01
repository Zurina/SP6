import React, {Component} from 'react';
import CountryTable from "./CountryTable";
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      countries: [],
      labels: [],
      error: ""
    }

  }

  async shouldStateUpdate() {
    try {
      var newData = await this.props.factory.observer();
      if(newData) {
        await this.getCountriesAsync();
      }
    }
    catch(error) {
    }
  }

  async getCountriesAsync() {
    try {
      var data = await this.props.factory.getCountries();
      this.setState({countries: data, error: ""});
    } 
    catch(error) {
      this.setState({error: error.message})
    }
  }

  async getLabelsAsync() {
    try {
      var data = await this.props.factory.getLabels();
      this.setState({labels: data, error: ""});
    } 
    catch(error) {
      this.setState({error: error.message});
    }
  }

  async componentDidMount() {
    //This would be the perfect place to fetch persons from the API
    this.getCountriesAsync();
    this.getLabelsAsync();
    this.oberserData = setInterval(this.shouldStateUpdate.bind(this), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.oberserData);
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>React, State, Fetch and Mobx</h2>
        </div>
        <div className="App-intro">
          <p>Your initial task is to fetch data from the server (see exercise for how to start it),
           and create a table below, with these data</p>          
          <CountryTable labels={this.state.labels} countries={this.state.countries}/>
        </div>
        <p>{this.state.error}</p>
      </div>
    );
  }
}

export default App;

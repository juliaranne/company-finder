import React from 'react';
import axios from 'axios';
import './styles/company_finder.scss';
import SelectList from './components/SelectList';

class CompanyFinder extends React.Component {
  state = {
    customers: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Customers')
      .then((response) => this.setState({customers: response.data}))
      .catch((error) => console.log(error));
  }

  getCountries = () => {
    const customerData = this.state.customers.map(item => item.Country);
    console.log(customerData);
    return customerData;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SelectList countries={this.getCountries()} />  
        </header>
      </div>
    )
  };
}

export default CompanyFinder;

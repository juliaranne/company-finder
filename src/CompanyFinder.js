import React from 'react';
import axios from 'axios';
import './styles/company_finder.scss';
import SelectList from './components/SelectList';

class CompanyFinder extends React.Component {
  state = {
    clients: [],
    selected: {
      country: '',
      city: '',
      company: '',
    },
  }

  componentDidMount() {
    axios.get('http://localhost:5000/Customers')
      .then((response) => this.setState({
        clients: response.data,
        selected: {
          country: response.data[0].Country,
          city: response.data[0].City,
          company: response.data[0].CompanyName
        }
      }))
      .catch((error) => console.log(error));
  }

  updateSelectedValues = (listName, value) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [listName]: value
      }
    })
  }

  getCountries = () => {
    const allCountries = this.state.clients.map(item => item.Country);
    const countryCount = allCountries.reduce((count, country) => {
      count[country] = ( count[country] || 0 ) + 1;
      return count;
    }, {});
    const countries = Object.keys(countryCount).sort(function(a, b) {
      return countryCount[b] - countryCount[a];
    });
    return countries;
  }

  getCities = (country) => {
    const cities = this.state.clients.filter(client => client.Country === country).map(item => item.City);
    const cityCount = cities.reduce((count, country) => {
      count[country] = ( count[country] || 0 ) + 1;
      return count;
    }, {});
    const popularCities = Object.keys(cityCount).sort(function(a, b) {
      return cityCount[b] - cityCount[a];
    });
    return popularCities;
  } 

  render() {
    return (
      <div className="company-finder">
        <SelectList
          name={'country'}
          handleSelection={this.updateSelectedValues}
          listValues={this.getCountries()}
        />
        <SelectList
          name={'city'}
          handleSelection={this.updateSelectedValues}
          listValues={this.getCities(this.state.selected.country)}
        />  
      </div>
    )
  };
}

export default CompanyFinder;

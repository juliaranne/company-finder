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

  sortByOccurance = (values) => {
    const occurance = values.reduce((count, value) => {
      count[value] = ( count[value] || 0 ) + 1;
      return count;
    }, {});
    const sortedArray = Object.keys(occurance).sort((a, b) => occurance[b] - occurance[a]);
    return sortedArray;
  }

  getCountries = () => {
    const allCountries = this.state.clients.map(item => item.Country);
    const countries = this.sortByOccurance(allCountries);
    return countries;
  }

  getCitiesInCountry = (country) => {
    const allCities = this.state.clients.filter(client => client.Country === country).map(item => item.City);
    const cities = this.sortByOccurance(allCities);
    return cities;
  } 

  render() {
    return (
      <div className="company-finder">
        <SelectList
          name={'country'}
          handleSelection={this.updateSelectedValues}
          listValues={this.getCountries()}
          selectedItem={this.state.selected.country}
        />
        <SelectList
          name={'city'}
          handleSelection={this.updateSelectedValues}
          listValues={this.getCitiesInCountry(this.state.selected.country)}
          selectedItem={this.state.selected.city}
        />  
      </div>
    )
  };
}

export default CompanyFinder;

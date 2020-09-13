import React from 'react';
import axios from 'axios';
import './styles/company_finder.scss';
import SelectList from './components/SelectList';
import Map from './components/Map';

class CompanyFinder extends React.Component {
  state = {
    clients: [],
    selected: {
      country: '',
      city: '',
      company: '',
      mapLocation: '',
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
        },
      }))
      .catch((error) => console.log(error));
  }

  updateSelectedValues = (listName, value) => {
    return this.setState({
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
  
  getCompaniesInCity = (city) => {
    const companies = this.state.clients.filter(client => client.City === city).map(item => item.CompanyName)
    return companies;
  }

  getLocation = async (company) => {
    let location = {};
    const selectedCompany = this.state.clients.filter(item => item.CompanyName === company);
    if (selectedCompany.length) {
      location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${selectedCompany[0].Address},+${selectedCompany[0].City}&key=AIzaSyC_4SXHxINkcPGkC1Q1VHZY6z2WwtgPym4`);
      return location.data.results[0].geometry.location;
    }
    return false;
  }

  render() {
    return (
      <div className="company-finder">
        <div className="company-finder__headings">
          <h2 className="company-finder__heading">Countries</h2>
          <h2 className="company-finder__heading">Cities</h2>
          <h2 className="company-finder__heading">Company</h2>
          <h2 className="company-finder__heading">Map</h2>
        </div>
        <div className="company-finder__fields">
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
          <SelectList
            name={'company'}
            handleSelection={this.updateSelectedValues}
            listValues={this.getCompaniesInCity(this.state.selected.city)}
            selectedItem={this.state.selected.company}
          />
          <div className="company-finder__map">
            <Map getLocation={this.getLocation(this.state.selected.company)} />
          </div>
        </div>
      </div>
    )
  };
}

export default CompanyFinder;

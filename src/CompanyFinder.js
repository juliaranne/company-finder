import React from 'react';
import axios from 'axios';
import './styles/company_finder.scss';

class CompanyFinder extends React.Component {
  componentDidMount() {
    axios.get('http://localhost:5000/Customers')
      .then((response) => console.log('This is your data', response.data))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>
    )
  };
}

export default CompanyFinder;

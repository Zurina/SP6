import React from 'react';
function CountryTable(props) {
    const { labels } = props;
    const { countries } = props;

    function handleArr(arr) {
      if(arr.length > 1) {
        return arr[0] + "(+"+(arr.length-1)+")";
      }
      else 
        return arr[0];
    }

    var labelHeaders = labels.map(label => {
      return (
        <th>{label}</th>
      );
    });

    var countryRows = countries.map(country => {
      return (
        <tr key={country.name}>
          <td>{country.name}</td>
          <td>{country.capital}</td>
          <td>{country.region}</td>
          <td>{country.population}</td>
          <td>{country.area}</td>
          <td>{handleArr(country.timezones)}</td>
          <td>{handleArr(country.borders)}</td>
          <td>{handleArr(country.topLevelDomain)}</td>
          <td>{handleArr(country.currencies)}</td>
          <td>{handleArr(country.languages)}</td>
        </tr>
      );
    });

    return (
      <table className="table">
        <thead>
          <tr>{labelHeaders}</tr>
        </thead>
        
        <tbody>
         {countryRows}
        </tbody>
      </table>
    );
  }
export default CountryTable;
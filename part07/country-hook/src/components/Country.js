import React from 'react'

const Country = ({ country }) => {

    
    if (!country) {
      return null
    }
    if (country.length === 0 || country.status === 404) {
      return (
        <div>
          not found...
        </div>
      )
    } else {
  
    const countryData = country[0]

    return (
      <div>
        <h3>{countryData.name} </h3>
        <div>capital {countryData.capital} </div>
        <div>population {countryData.population}</div> 
        <img src={countryData.flag} height='100' alt={`flag of ${countryData.name}`}/>  
      </div>
    )
    }
  }
  
  export default Country
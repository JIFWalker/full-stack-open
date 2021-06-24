import React from 'react'
import CountryRender from './CountryRender'

const Display = ({results, handleClick}) => {
    switch (true) {
      case results.length > 10:
        return (
          <p>Too many matches, please refine search</p>
        )
      case results.length <= 10 && results.length > 1:
        return (
          results.map(country => 
            <ul key={country.name}>
              {country.name}
              <button onClick={() => handleClick(country)}>
                Show
              </button>
            </ul>
          )
      )
      case results.length === 1:
        return (
            <div>
        <CountryRender 
          country = {results[0]}
          />
          </div>
        )
      default:
        return (
          <p>Please type the name of a country</p>
        )
    }
  }

export default Display
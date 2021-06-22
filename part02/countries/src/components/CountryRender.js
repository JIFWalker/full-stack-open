import React from 'react'

const CountryRender =  ({country}) => {
    console.log(country)
    console.log(country.languages)
    return (
    <div>
        <h1>{country.name}</h1>

        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>

    <h3>Languages</h3>
        <ul>
        {country.languages.map(language => 
            <li key = {language.name} >
                {language.name}
            </li>)}
        </ul>

    <p><img src={country.flag} alt = {`${country.nam}'s flag`} 
    width = {"25%"} height = {"25%"} />
    </p>
    </div>
    
)
    }
export default CountryRender
import React, {useState, useEffect} from 'react'
import axios from 'axios'



const CountryRender =  ({country}) => {
    const [ weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY


    useEffect(() => {

        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key : api_key,
                    query : country.capital
                }
            })
            .then(response => {
                console.log('response', response.data)
                const data = response.data
                setWeather(data.current)

            })
    }, [api_key, country.capital])


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

            <p>
            <img 
                src={country.flag} 
                alt = {`${country.name}'s flag`} 
                width = {"25%"} 
                height = {"25%"} 
            />
            </p>

            <h2>Weather in {country.capital}</h2>
            <p>Temperature: {weather.temperature} Celsius</p>
            <img
                src={weather.weather_icons}
                alt = {weather.descriptions}
            />    
            <p> Wind: {weather.wind_speed} MPH {weather.wind_dir} </p>
        </div> 
    )
}
    
export default CountryRender
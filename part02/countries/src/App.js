import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryRender from './components/CountryRender.js'




const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchParam, setSearchParam ] = useState('')
  const [ results, setResults ] = useState([])

useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('response')
      setCountries(response.data)
    })
}, [])

const handleSearch = (event) => {
  setSearchParam(event.target.value.toLowerCase())
  setResults(countries.filter(country => 
    country.name.toLowerCase().includes(searchParam))
  )
}

const Display = () => {
  console.log('length', results.length)
  switch (true) {
    case results.length > 10:
      return (
        <p>Too many matches, please refine search</p>
      )
    case results.length <= 10 && results.length > 1:
      return (
        results.map(country =>
          <ul key = {country.name} >
            {country.name}
          </ul>
      ))
    case results.length === 1:
      return (
      <CountryRender 
        country = {results[0]}
        />
      )
    default:
      return (
        <p>Please type the name of a country</p>
      )
  }
}



  return (
    <div>
    <Search
      searchParam = {searchParam}
      handleSearch = {handleSearch}
    />

    <Display 
      results = {results}
    />
    </div>
  )
}

export default App


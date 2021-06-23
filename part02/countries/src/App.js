import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryRender from './components/CountryRender.js'
import Display from './components/Display'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchParam, setSearchParam ] = useState('')
  const [ results, setResults ] = useState([])

useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
setCountries(response.data)
    })
}, [])

const handleSearch = (event) => {

  setSearchParam(event.target.value.toLowerCase())
  setResults(countries.filter(country => 
    country.name.toLowerCase()
    .includes(event.target.value.toLowerCase()))
  )
}

const handleClick = (country) => (
  <div>
    <CountryRender results = {country} />
    {setResults([country])}
  </div>
)

  return (
    <div>
    <Search
      searchParam = {searchParam}
      handleSearch = {handleSearch}
    />

    <Display 
      results = {results}
      handleClick = {handleClick}
    />
    </div>
  )
}

export default App


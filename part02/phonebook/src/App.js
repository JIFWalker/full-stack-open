import React, { useState, useEffect } from 'react'
import PersonsRender from './Components/PersonsRender'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import axios from 'axios'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ searchParam, setSearchParam] = useState('')
  const [ isEmpty, setEmpty] = useState(true)


  const handleNameChange = (event) => (
    setNewName(event.target.value)
  )
  const handleNumChange = (event) => (
    setNewNum(event.target.value)
  )

  const handleSearch = (event) => {
    setSearchParam(event.target.value.toLowerCase())
    event.target.value !== ''
      ? setEmpty(false)
      : setEmpty(true)
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])    


  const display = isEmpty
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(searchParam))
      

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNum
    }
    switch (true) {
      case persons.map(person => person.name).includes(personObject.name):
        alert(`${newName} is already added to phonebook`)
        break
      case persons.map(person => person.number).includes(personObject.number):
        alert(`${newNum} is already added to phonebook`)
        break
      default:
       setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNum('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        searchParam = {searchParam}
        handleSearch = {handleSearch}
      />
      
      <h2>Add a new</h2>
      
      <PersonForm 
        addPerson = {addPerson}
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNum = {newNum}
        handleNumChange = {handleNumChange}
      />
      
      <h2>Numbers</h2>
      
      <PersonsRender 
        display = {display} 
      /> 
    </div>
  )
}

export default App


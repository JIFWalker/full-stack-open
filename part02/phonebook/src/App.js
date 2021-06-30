import React, { useState, useEffect } from 'react'
import PersonsRender from './components/PersonsRender'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/Person'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ searchParam, setSearchParam] = useState('')
  const [ isEmpty, setEmpty] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)
    })
  }, [])   

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

  const confirmDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
      setPersons(persons.filter(entry => 
        entry.id !== person.id))}
  }


  const display = isEmpty
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(searchParam))
      

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNum,
      id: newName
    }
    switch (true) {
      case persons.map(person => person.name).includes(personObject.name):
        alert(`${newName} is already added to phonebook`)
        break
      case persons.map(person => person.number).includes(personObject.number):
        alert(`${newNum} is already added to phonebook`)
        break
      default:
       personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
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
        confirmDelete = {confirmDelete}
      /> 
    </div>
  )
}

export default App


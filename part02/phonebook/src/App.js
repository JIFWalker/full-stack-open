import React, { useState, useEffect } from 'react'
import PersonsRender from './components/PersonsRender'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/Person'
import Notification from './components/Notification'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ searchParam, setSearchParam] = useState('')
  const [ isEmpty, setEmpty] = useState(true)
  const [notification, setNotification] = useState(null)

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
      personService
        .remove(person.id)
        .then(setNotification(`${person.name} has been deleted from phonebook`))
        .catch(error => setNotification(`${person.name} has already been deleted from phonebook`))
      setPersons(persons.filter(entry => 
        entry.id !== person.id))
    }
  }

  const updateNumber = (personObject) => {
    if (window.confirm(`${newName} is already added to phonebook, 
    replace the old number with a new one?`)) {
      personService
      .update(personObject.id, personObject)
      .then(setNotification(`${personObject.name}'s number has been updated`))
      .catch(error => setNotification(`${personObject.name} has already been deleted from phonebook`))
      setPersons(persons.map(person => { 
        return person.id === personObject.id ? personObject : person
      }))
    }
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
    const containsName = persons.map(person => person.name).includes(personObject.name)
    const containsNum = persons.map(person => person.number).includes(personObject.number)
    switch (true) {
      case containsName && !containsNum:
        updateNumber(personObject)
      break
      case containsName:
        setNotification(`${newName} is already in the phonebook`)
      break
      case containsNum:
        setNotification(`${newNum} is already in the phonebook`)
      break
      default:
       personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`${personObject.name} has been added to the phonebook`)
        })
    }
    setNewName('')
    setNewNum('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message = {notification} 
        setNotification = {setNotification}
      />
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


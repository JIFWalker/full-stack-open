import React, { useState } from 'react'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ searchParam, setSearchParam] = useState('')
  const [ isEmpty, setEmpty] = useState(true)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => (
    setNewNum(event.target.value)
  )
  const handleSearch = (event) => {
    setSearchParam(event.target.value.toLowerCase())
    event.target.value !== ''
      ? setEmpty(false)
      : setEmpty(true)
  }

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
        <form>
          filter shown with <input 
            value = {searchParam}
            onChange = {handleSearch}
          />
        </form>
      <h2>Add a new</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input 
            value = {newName}
            onChange = {handleNameChange}
            />
        </div>
        <div>
          number: <input
            value = {newNum}
            onChange = {handleNumChange}
            />
        </div>
        <div>
          <button type = "submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {display.map(person =>   
          <ul key = {person.name} >
            {person.name}: {person.number}
          </ul>
        )}
    </div>
  )
}

export default App


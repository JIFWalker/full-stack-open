import React from 'react'



const PersonsRender = ({display, confirmDelete}) => (
    display.map(person => 
   <ul key = {person.name} >
    {person.name}: {person.number} <button onClick = {() => confirmDelete(person)}>
        Delete
      </button> 
  </ul>
  )
)


 

export default PersonsRender
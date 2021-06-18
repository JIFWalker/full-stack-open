import React from 'react'


const PersonsRender = ({display}) => (
    display.map(person => 
   <ul key = {person.name} >
    {person.name}: {person.number}
  </ul>
  )
)

export default PersonsRender
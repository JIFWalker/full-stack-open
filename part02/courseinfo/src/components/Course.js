import React from 'react';


const Header = ({ course }) => (
    <h1>{course.name}</h1>
  )
  
  const Sum = ({course}) => {
    const count = course.map(part => part.exercises)
    const sum = count.reduce((total, exercises) => total + exercises, 0)
    
    return(
      <h5>total of {sum} exercises</h5>
    ) 
  }
  
  const Part = ({name, exercises}) => (
    <p>
      {name} {exercises}
    </p>
  )
  
  const Content = ({ course }) => (
    <div>
      {course.map(part => 
        <Part key = {part.id} name = {part.name} exercises = {part.exercises} />
      )}
   </div>
  )
  
  const Course = ({course}) => (
    <div>
      <Header course={course} />
      <Content course={course.parts} />
      <Sum course={course.parts} />
    </div>
  )

  export default Course
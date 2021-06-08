import React from 'react';
import ReactDOM from 'react-dom';

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



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    courses.map(course => <Course key = {course.id} course = {course} />)
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
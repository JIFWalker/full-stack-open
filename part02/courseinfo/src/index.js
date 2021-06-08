import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

// const Total = ({ course }) => {
//   const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
//   return(
//     <p>Number of exercises {sum}</p>
//   ) 
// }

const Part = ({parts}) => (
  parts.map(part => 
    <p key = {part.id}>
      {part.name} {part.exercises}
    </p>)
)

const Content = ({ course }) => (
  <div>
       <Part parts = {course} />
 </div>
)


const Course = ({course}) => {
  return (
  <div>
    <Header course = {course} />
    <Content course = {course.parts} />
  </div>
  ) 
}

const App = () => {
  const course = {
    id: 69,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
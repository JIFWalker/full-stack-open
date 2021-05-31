import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const random = () => {
     setSelected(Math.floor(Math.random() * (anecdotes.length)))
    }

  const vote = (selected) => () => { 
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick = {vote(selected)} text = "Vote" />
      <Button handleClick = {random} text = "next anecdote" />
      <Display points = {points} anecdotes = {anecdotes}/>
    </div>
  )
}


const Button = ({handleClick, text}) => (
    <button onClick = {handleClick} >
      {text}
    </button>
    )


const Display = ({points, anecdotes}) => {
let top = points.indexOf(Math.max(...points))

  return (
    <div>
      <h2>
        Anecdote with most votes
      </h2>
      <p>{anecdotes[top]}</p>
      <p>has {points[top]} votes</p>
    </div>
  )
}

export default App


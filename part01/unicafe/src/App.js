import React, { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increase = (vote, setVote) => () => {
    setVote(vote + 1)
  }
  

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick = {increase(good, setGood)} text = "good" />
      <Button handleClick = {increase(neutral, setNeutral)} text = "neutral" />
      <Button handleClick = {increase(bad, setBad)} text = "bad" />


      <h2>Statistics</h2>
      <Display value = {good} text = "good" />
      <Display value = {neutral} text = "neutral" />
      <Display value = {bad} text = "bad" />
    </div>

  )
}

const Display = props => (
  <div>{props.text} {props.value}</div>
)


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


export default App

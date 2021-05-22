import React, { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const tally = (vote, setVote) => () => {
    setVote(vote + 1)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick = {tally(good, setGood)} text = "good" />
      <Button handleClick = {tally(neutral, setNeutral)} text = "neutral" />
      <Button handleClick = {tally(bad, setBad)} text = "bad" />
      
      <h2>Statistics</h2>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />

    </div>

  )
}

const Statistic = props => (
  <div>{props.text} {props.value} {props.percent}</div>
)


const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const all = good + neutral + bad
    const average = (good + (-bad)) / all
    const positive = good / all * 100

  if (all >0) {
    return (
      <>
      <Statistic value = {good} text = "good" />
      <Statistic value = {neutral} text = "neutral" />
      <Statistic value = {bad} text = "bad" />
      <Statistic value = {all} text = "all" />
      <Statistic value = {average} text = "average" />
      <Statistic value = {positive} text = "positive" percent = "%" />
      </>
    )
  } else return <>No feedback given</>  
}


export default App

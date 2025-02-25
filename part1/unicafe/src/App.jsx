import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// do not define a component within another component
const StatisticLine = (props) => {
  if (props.feedback === 'positive') {
    return (
      <div>
        <table><tbody><tr><td>{props.feedback} {props.number} %</td></tr></tbody></table>
        
      </div>
    )
  }
  return (
    <div>
      <table><tbody><tr><td>{props.feedback} {props.number}</td></tr></tbody></table>
    </div>
    
  )
}

// a proper place to define a component
const Statistics = (props) => {
  console.log(props)
  const total = props.feedbacks[0].number + props.feedbacks[1].number + props.feedbacks[2].number

  if (total === 0) {
    return (
      <div>
        <h1> <b>{props.title}</b></h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1> <b>{props.title}</b></h1>
      <StatisticLine feedback = {props.feedbacks[0].feedback} number = {props.feedbacks[0].number} />
      <StatisticLine feedback = {props.feedbacks[1].feedback} number = {props.feedbacks[1].number} />
      <StatisticLine feedback = {props.feedbacks[2].feedback} number = {props.feedbacks[2].number} />
      <StatisticLine feedback = {props.feedbacks[3].feedback} number = {props.feedbacks[3].number} />
      <StatisticLine feedback = {props.feedbacks[4].feedback} number = {props.feedbacks[4].number} />
      <StatisticLine feedback = {props.feedbacks[5].feedback} number = {props.feedbacks[5].number} />
    </div>
  )
}

/* const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
) */

const Button = (props) => { 
  //console.log(props)
  //const { Click, text } = props
  return (
    <button onClick={props.Click}>
      {props.text}
    </button>
  )
}
// have some bugs


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const title = 'statistics'
  const updateGood = good + 1
  const updateNeutral = neutral + 1
  const updateBad = bad + 1
  const updateAll = all + 1
 
  const feedbacks = [
    {
      feedback: 'good',
      number: good
    }, 
    {
      feedback: 'neutral',
      number: neutral
    }, 
    {
      feedback: 'bad',
      number: bad
    },
    {
      feedback: 'all',
      number: all
    },
    {
      feedback: 'average',
      number: average
    },
    {
      feedback: 'positive',
      number: positive
    }
  ]
  

  return (
    <div>
      <h1> <b>give feedbacks</b></h1>
      <Button Click = {() => {
          setGood(updateGood); 
          setAll(updateAll); 
          setAverage((updateGood-bad)/updateAll); 
          setPositive(updateGood/updateAll*100)}
      } text = 'good' />

      <Button Click = {() => {
        setNeutral(updateNeutral); 
        setAll(updateAll); 
        setAverage((good - bad)/updateAll); 
        setPositive(good/updateAll*100)}
      } text = 'neutral' />

      <Button Click = {() => {
        setBad(updateBad); 
        setAll(updateAll); 
        setAverage((good-updateBad)/updateAll); 
        setPositive(good/updateAll*100)}
      } text = 'bad' />
      
      
      <Statistics title = {title} feedbacks = {feedbacks}/>

    </div>
  )
}

/* function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  console.log(all) // cannot place inside return
  return (
    <div>
      <h1> <b>give feedbacks</b></h1>
      <button onClick={() => {good+1; setGood(good+1)}}> good </button>
      <button onClick={() => {neutral+1; setNeutral(neutral+1)}}> neutral </button>
      <button onClick={() => {bad+1; setBad(bad+1)}}> bad </button>
      
      <h1> <b>statistics</b></h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      
      <p>all {all}</p>
      <p>average {(good-bad)/all}</p>
      <p>positive {good/all*100}%</p>
    </div>
  )
} */

export default App

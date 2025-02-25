import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getVote(votes) {
  if (votes > 0) {
    return (
      <div><p>has {votes} votes</p></div> 
    )
  }
  return (
  <>
  </>
  )
}

function getTitle(votes, text) {
  if (votes > 0) {
    return (
      <h1>{text}</h1>
    )
  }
  return (
  <>
  </>
  )
}

function getMax(votes, array, maxNum, maxIndex) {
  if (votes > 0) {
    return (
      <div>           
      <p>{array[maxIndex]}</p>
      <p>has {maxNum} votes</p>
    </div>
    )
  }
  return (
  <>
   <p>there aren't any votes.</p>
  </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0)
  const updateVote = vote + 1
  //const randomNumber = getRandomInt(8) const has bug in button
  
  const [array, setArray] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  
  const handleChangeValue = (index, newValue) => {
    const newArray = [...array]; // Create a copy of the original array
    newArray[index] = newValue; // Update the value at the specified index
    setArray(newArray); // Set the state with the updated array
  };

  const maxNum = Math.max(...array)
  const maxIndex = array.indexOf(maxNum)
  const updateArray = array[selected]+1

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>

      {getVote(array[selected])}

      <button onClick={() => {updateVote; setVote(updateVote); handleChangeValue(selected, updateArray)}}>vote</button>
      <button onClick={() => {setSelected(getRandomInt(8));}}> next anecodtes </button> 
      
      <h1>Anecdotes with most votes</h1>
      {getMax(vote, anecdotes, maxNum, maxIndex)}
    </div>
  )
}

export default App
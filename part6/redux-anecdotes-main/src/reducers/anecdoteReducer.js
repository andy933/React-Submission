import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject) */

/* const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
    {
      const id = action.payload.id
      const voting = state.find(a => a.id === id)
      const votedAnecdote = {
        ...voting,
        votes: voting.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    }
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    default:
      return state
  } 
}

export const giveVoting = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type:'NEW_ANECDOTE',
    payload:{
      content,
      id: getId(),
      votes: 0
    }
  }
} */

const anecdoteSlice = createSlice({
  name: 'anecdoteType',
  initialState: [],
  reducers: {
/*     createAnecdote(state, action) {
      const content = action.payload
      state.push({ //only ok to mutate state with createSlice function
        content,
        id: getId(),
        votes: 0
      })
    }, */
    createAnecdote(state, action) {
      state.push(action.payload)
    },
/*     giveVoting(state, action) {
      const id = action.payload
      const voting = state.find(a => a.id === id)
      const votedAnecdote = {
        ...voting,
        votes: voting.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    }, */
    giveVoting(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, giveVoting, setAnecdote } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}
export const appendAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}
export const increaseVote = (id, anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.updateVotes(id, anecdote)
    dispatch(giveVoting(votedAnecdote))
  }
}
export default anecdoteSlice.reducer
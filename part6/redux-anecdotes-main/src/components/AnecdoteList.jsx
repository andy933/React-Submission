import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
//import { giveVoting } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if (state.filter === '') {
        return state.anecdotes
      }
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })

    //const sortedAnecdotes = anecdotes?.sort((a, b) => b.votes - a.votes)
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        //dispatch(giveVoting(id))
        //dispatch({ type: 'anecdoteType/giveVoting', payload: anecdote.id })
        dispatch(increaseVote(anecdote.id, anecdote))
        //dispatch({ type: 'notificationType/createVoteNotification', payload: anecdote.content })
        //setTimeout(() => { dispatch({ type: 'notificationType/clearNotification' }) }, 5000)
        dispatch(setNotification(`you voted for '${anecdote.content}'` , 10))
    }

  return (
    <div>
      {sortedAnecdotes?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
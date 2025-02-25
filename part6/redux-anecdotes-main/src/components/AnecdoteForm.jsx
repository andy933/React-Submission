import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdoteService'
import { appendAnecdote, createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
//import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

/*   const addAnecdotes = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //dispatch(createAnecdote(content))
    dispatch({ type: 'anecdoteType/createAnecdote', payload: content })
    dispatch({ type: 'notificationType/createNewNotification', payload: content })
    setTimeout(() => { dispatch({ type: 'notificationType/createTimeout', payload: null }) }, 5000)
  } */

  const addAnecdotes = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const newAnecdote = await anecdoteService.createNew(content)
    //dispatch(createAnecdote(newAnecdote))
    dispatch(appendAnecdote(content))
    //dispatch({ type: 'notificationType/createNewNotification', payload: content })
    //setTimeout(() => { dispatch({ type: 'notificationType/clearNotification' }) }, 5000)
    dispatch(setNotification(`you created a new anecdote '${content}'`, 10))
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdotes}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm
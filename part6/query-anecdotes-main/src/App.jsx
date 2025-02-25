import { createAnecdote, getAnecdotes, increaseVote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReducer } from 'react'
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
        return `anecdote '${action.payload}' created`
    case "VOTE":
        return `anecdote '${action.payload}' voted`
    case "SHORT":
        return 'too short anecdote, must have length 5 or more'
    default:
        return null
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const votingMutation = useMutation({ 
    mutationFn: increaseVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  //** placing votingMutation under addAnecdote will cause bug that if add a new anecdote, the first vote fail */
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      newAnecdoteMutation.isError = true
      notificationDispatch({ type: "SHORT" }); 
      setTimeout(() => { notificationDispatch({ type: "" }) }, 5000)
      console.log('too short anecdote, must have length 5 or more')
    }
    else {
      newAnecdoteMutation.mutate({ content, votes: 0 })
    }
  }



  const handleVote = (anecdote) => {
    votingMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    console.log(anecdote.content, anecdote.votes, anecdote.votes + 1)
    notificationDispatch({ type: "VOTE", payload: anecdote.content }); 
    setTimeout(() => { notificationDispatch({ type: "" }) }, 5000)
  }
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  //console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification} />
      <AnecdoteForm addAnecdote={addAnecdote} dispatch={notificationDispatch} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

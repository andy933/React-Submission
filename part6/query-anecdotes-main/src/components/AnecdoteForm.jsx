import React, { useRef } from "react"

const AnecdoteForm = ({addAnecdote, dispatch}) => {
  const inputRef = useRef(null)

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' ref={inputRef} />
        <button type="submit" onClick={() => {
          inputRef.current.value.length > 4 && 
          dispatch({ type: "CREATE", payload: inputRef.current.value }); 
          setTimeout(() => { dispatch({ type: "" })}, 5000)
          } 
        }>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const increaseVote = updateAnecdote => {
  axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote).then(res => res.data)
}

/* ,
    {
      "content": "Adding manpower to a late software project makes it later!",
      "id": "21149",
      "votes": 4
    },
    {
      "content": "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      "id": "69581",
      "votes": 0
    },
    {
      "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      "id": "36975",
      "votes": 0
    },
    {
      "content": "Premature optimization is the root of all evil.",
      "id": "25170",
      "votes": 0
    },
    {
      "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      "id": "98312",
      "votes": 0
    } */
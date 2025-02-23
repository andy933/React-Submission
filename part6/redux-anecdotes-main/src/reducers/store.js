import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdote } from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import anecdoteService from '../services/anecdoteService'

export const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
})

/* anecdoteService.getAll().then(anecdotes => {
  store.dispatch(setAnecdote(anecdotes))
}) */
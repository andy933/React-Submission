import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const notificationSlice = createSlice({
    name: 'notificationType',
    initialState,
    reducers: {
/*         createNewNotification(state, action) {
            return `you created a new anecdote '${action.payload}'`          
        },
        createVoteNotification(state, action) {
            return `you voted for '${action.payload}'` 
        }, */
        createNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

export const { createNotification, clearNotification } = notificationSlice.actions
export const setNotification = (message, dispatchTime) => {
    return dispatch => {
      dispatch(createNotification(message))
      setTimeout(() => { dispatch(clearNotification()) }, dispatchTime * 1000)
    }
  }

export default notificationSlice.reducer
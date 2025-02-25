import { createSlice } from "@reduxjs/toolkit"

/* const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
} */
const initialState = ''
const filterSlice = createSlice({
    name: 'filterType',
    initialState,
    reducers: {
        createFilter(state, action) {
            return action.payload
        }
    }
})

//export default filterReducer
export const { createFilter } = filterSlice.actions
export default filterSlice.reducer
import { combineReducers } from 'redux'

import todoReducer from './todos/todoReducer'

const reducers = combineReducers({
    todo: todoReducer
})

export default reducers
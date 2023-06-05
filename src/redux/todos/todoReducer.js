import { ADD_TODO } from "../constants"
const initialState = {
    todoList : []
}

const todoReducer = (state= initialState, action) => {
    switch(action.type) {
        case ADD_TODO: {
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            }
        }
        default: return state
    }
}

export default todoReducer
import { ADD_TODO } from "../constants";

export const addTodo = (newTodo) => {
    return {
        type: ADD_TODO,
        payload : newTodo
    }
}
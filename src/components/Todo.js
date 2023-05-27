import React, { useState , useEffect } from 'react';

const getLocalList =()=>{
    let list = localStorage.getItem('todolist')
    if(list){
        return JSON.parse(list)
    }else{
        return [];
    }
}

const Todo = () => {

    const [newTodo , setNewTodo] = useState({
        title : '',
        desc: '',
    });

    const [todoList , setTodoList] = useState(getLocalList());

    const handleAddTodoItem = (e) => {
        const { name, value } = e.target;
        setNewTodo({ ...newTodo, [name]: value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (todoList) {
            setTodoList([...todoList, newTodo])
        } else {
            localStorage.setItem('todolist', JSON.stringify([newTodo]))
        }

        setNewTodo({ ...newTodo, title: '', desc: ''})
    }

    const deleteTodo =(index)=>{
        let updatedList = todoList.filter((item,ind)=>{
            return ind !== index;
        })

        setTodoList(updatedList)
    }

    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(todoList))
    },[todoList])

    return (
        <div>
            <input 
                type='text' 
                value={newTodo.title} 
                name="title" 
                onChange={handleAddTodoItem} 
                placeholder='Enter Todo' />
            <input 
                type='text' 
                value={newTodo.desc} 
                name="desc" 
                onChange={handleAddTodoItem} 
                placeholder='Enter Description' />
            <button onClick={handleSubmit}>
                Add
            </button>
            {
                todoList && todoList.length ? todoList.map((value,index) => {                  
                    return (
                        <div>
                            <p>Title:  {value.title} <button onClick={() => deleteTodo(index)}>X</button> </p>
                            <p className="">Description : {value.desc} </p>
                            
                        </div>
                    );
                }) : ( <h4>No Todos, Add a todo</h4>)
            }
        </div>
    )
}

export default Todo;
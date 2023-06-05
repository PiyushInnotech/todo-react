import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getLocalList = () => {
    let list = localStorage.getItem('todolist')
    if (list) {
        return JSON.parse(list)
    } else {
        return [];
    }
}

const Todo = () => {
    const [todoList, setTodoList] = useState(getLocalList());
    const [activeIndex, setActiveIndex] = useState(-1);
    const navigate = useNavigate();

    const deleteTodo = (e, index) => {
        e.stopPropagation();
        let updatedList = todoList.filter((item, ind) => {
            return ind !== index;
        })

        setTodoList(updatedList)
    }

    const editTodo = (e, id) => {
        e.stopPropagation();
        navigate(`/edittodo/${id}`)
    }

    const addNewTodo = () => {
        navigate('/addtodo')
    }

    const showDescription = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    }

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(todoList))
    }, [todoList])

    return (
        <div className='todoList'>
            <h1 className="pageHeading">To Do List</h1>
            <div className='listWrapper'>
                {
                    todoList && todoList.length ? todoList.map((todo, index) => {
                        return (
                            <div className="listItem" key={todo.id}>
                                <div className='title' onClick={() => showDescription(index)}>
                                    <p>{todo.title}</p>
                                    <div>
                                        <button onClick={(e) => deleteTodo(e, index)}>X</button>
                                        <button onClick={(e) => editTodo(e ,todo.id)}>Edit</button>
                                    </div>
                                </div>
                                {index === activeIndex && <p className="desc"> Description: {todo.desc} </p>}
                            </div>
                        );
                    }) : (
                        <div className="noTodo">
                            <h4 className='pageSubHeading'>No Todos, Add a todo</h4>
                            <button className='' onClick={() => addNewTodo()}>Add</button>
                        </div>
                    )
                }
            </div>
            { todoList && todoList.length && <button className='addButton' onClick={() => addNewTodo()}>Add</button> }
        </div>
    )
}

export default Todo;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const getLocalList = () => {
    let list = localStorage.getItem('todolist')
    if (list) {
        return JSON.parse(list)
    } else {
        return [];
    }
}

const AddTodo = () => {
    const [newTodo, setNewTodo] = useState({
        title: '',
        desc: '',
        id: null,
        showDesc: false
    });
    const navigate = useNavigate();
    const {todoId} = useParams();
    const [error, setError] = useState('');
    const [todoList, setTodoList] = useState(getLocalList());
    const newTodoId = todoList && todoList.length ? todoList[todoList.length-1].id + 1 : 1
  
    useEffect(() => {
        if (todoId) {
            let updatedList = todoList.filter( (item, index) => {
                return item.id == todoId
            })
            setNewTodo( updatedList[0])
        } else {
            setNewTodo((prevTodo) => ({ ...prevTodo, id: newTodoId }));
            console.log('hellooo')
        }
    }, [newTodoId, todoId])

    const handleAddTodoItem = (e) => {
        const { name, value } = e.target;
        if (value) {
            setError('')
        }
        setNewTodo({ ...newTodo, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.title && newTodo.desc) {
            if (todoList) {
                setTodoList([...todoList, newTodo]);
                localStorage.setItem("todolist", JSON.stringify([...todoList, newTodo]))
            } else {
                localStorage.setItem('todolist', JSON.stringify([newTodo]))
            }
            setNewTodo({ ...newTodo, title: '', desc: '' })
            navigate('/')
        } else {
            setError('Title and Description Should not be Empty')
        }
    }

    const handleEditTodo = (e) => {
        e.preventDefault();
        if (newTodo.title && newTodo.desc) {
            let updatedList = todoList.map((item) => {
                if (item.id == todoId) {
                    return {...newTodo}
                }
                return item
            })
            localStorage.setItem("todolist", JSON.stringify(updatedList))
            navigate('/')
        } else {
            setError('Title and Description Should not be Empty')
        }
    }

    return (
        <div className="formWrapper">
            {todoId ? <h1 className='pageHeading'>Edit Your Todo</h1> : <h1 className='pageHeading'>Add ToDo to your List.</h1> }
            <form>
                <label>Title</label>
                <input
                    type='text'
                    value={newTodo.title}
                    name="title"
                    onChange={handleAddTodoItem}
                    placeholder='Enter Todo' />
                <label>Description</label>
                <textarea
                    value={newTodo.desc}
                    name="desc"
                    onChange={handleAddTodoItem}
                    placeholder='Enter Description' />

                <p>{error}</p>
                { todoId ? 
                <button onClick={handleEditTodo}>
                    Edit
                </button>  :
                <button onClick={handleSubmit}>
                    Add
                </button> 
                }
            </form>
        </div>
    )
}

export default AddTodo
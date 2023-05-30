import './App.css';
import Todo from './components/Todo.js'
import AddTodo from './components/AddTodo.js'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/addtodo" element={<AddTodo />} />
      <Route path="/edittodo/:todoId" element={<AddTodo />} />
      {/* <Route path="*" element={<NoPage />} /> */}
    </Routes>
  );
}

export default App;

import React, {Fragment, useState, useEffect } from "react";
import EditTodo from "../components/EditTodo";
const Home = () => {

  const [description, setDescription] = useState("")

  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {
      const body = {description};
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      window.location = "/reactodo";
    } catch (err) {
     console.error(err.message); 
    }
  };

  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
    //console.log(todos);
  }
  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
       method: "DELETE" });
      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch (err) {
      console.error(err.message)
    }
  }
    return (
        <Fragment>

            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
              <input type="text" 
              className="form-control" 
              value={description}
              onChange={e => setDescription(e.target.value)}/>
              <button className="btn btn-success">Add</button>
            </form>
        
        <h1>List of Todos</h1>
        <table className="table table-striped mt-5 text-center" >
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* 
             <tr>
              <td>John</td>
              <td>Doe</td>
              <td>john@example.com</td>
            </tr>
            
            */}
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo}/></td>
              <td><button className="btn btn-danger" 
              onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
            </tr>
          ))
          }
          </tbody>
        </table>
        
        </Fragment>
    )
};
export default Home;
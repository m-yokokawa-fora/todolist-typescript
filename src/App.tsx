import React from 'react';
import './App.css';
import {useState} from "react";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [inputValue, setInputValue] = useState("");

  type Todo = {
      inputValue : string;
      id : number;
      checked : boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // OnSubmitするたびに画面がリロードされないようにする

    // 新しいTodoを作成
    const newTodo : Todo = {
      inputValue : inputValue,
      id : todos.length,
      checked : false
    }
    setInputValue("");
    setTodos([newTodo, ...todos]);
    
  };

  const handleEdit = (id: number, inputValue:string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos)
  };

  const handleCheck = (id:number, checked:boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.checked = !todo.checked;
      }
      return todo;
    });
    setTodos(newTodos)    
  };

  const handleDelete = (id:number) => {
    const newTodo = todos.filter((todo)=> todo.id !== id);
    setTodos(newTodo);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="text" 
            onChange={(e) => handleChange(e)} 
            className='inputText'/>
          <input 
            type="submit" 
            value="作成" 
            className='submitButton'/>
        </form>
        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input 
                type="text" 
                onChange={(e) => handleEdit(todo.id, e.target.value)} 
                className='inputText' 
                value={todo.inputValue}
                disabled={todo.checked}    
              />
              <input 
                type="checkbox" 
                onChange={() => handleCheck(todo.id,todo.checked)} 
                value={todo.inputValue}    
              />
              <button onClick={() => handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

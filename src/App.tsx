
import './App.css'
import { useState } from 'react'

  type Todo = {
    id: number
    text: string
    completed: boolean
  }

function App() {
  const [inputText,setInputText] = useState('')
   const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = () =>{
    const newTodo: Todo ={
      id: Date.now(),
      text: inputText,
      completed: false      
    }

    setTodos([...todos,newTodo])
    
  }

 
  return(
  <>
  <h1>アッツーのTODOアプリ</h1>

  <input type="text" placeholder='TODOを入力'
  value={inputText}
  onChange={(event) => {
    setInputText(event.target.value)
  }}
  />

  <button onClick={handleAddTodo}>追加</button>
  
   <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        {todo.text} 
      </li>
    ))}
  </ul>
  </>

 
  )
}

export default App

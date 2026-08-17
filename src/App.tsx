
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

    if(inputText.trim() === ''){
      return
    }

 

    const newTodo: Todo ={
      id: Date.now(),
      text: inputText,
      completed: false      
    }

    setTodos([...todos,newTodo])
    setInputText('')
    
  }

 
   const handleDeleteTodo = (targetId: number) => {
    const remainingTodos = todos.filter((todo) =>{
      return todo.id !== targetId
    })

    setTodos(remainingTodos)
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
        <button onClick={() => handleDeleteTodo(todo.id)}>
          削除
          </button>
      </li>
    ))}
  </ul>
  </>

 
  )
}

export default App

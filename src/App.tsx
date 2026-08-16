
import './App.css'
import { useState } from 'react'
function App() {
  const [inputText,setInputText] = useState('')

  return(
  <>
  <h1>アッツーのTODOアプリ</h1>

  <input type="text" placeholder='TODOを入力'
  value={inputText}
  onChange={(event) => {
    setInputText(event.target.value)
  }}
  />

  <button>追加</button>
  </>
  )
}

export default App

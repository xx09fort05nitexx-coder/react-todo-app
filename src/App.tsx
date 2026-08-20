import { useEffect, useState } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

const STORAGE_KEY = 'attsu-todos'

function App() {
  const [inputText, setInputText] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY)

    if (!savedTodos) return []

    try {
      return JSON.parse(savedTodos) as Todo[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = () => {
    const trimmedText = inputText.trim()
    if (trimmedText === '') return

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    }

    setTodos((currentTodos) => [...currentTodos, newTodo])
    setInputText('')
  }

  const handleDeleteTodo = (targetId: number) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== targetId),
    )
  }

  const handleToggleTodo = (targetId: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === targetId
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    )
  }

  const handleClearCompleted = () => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => !todo.completed),
    )
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter((todo) => !todo.completed).length
  const hasCompletedTodo = todos.some((todo) => todo.completed)

  return (
    <main className="todo-app">
      <h1>アッツーのTODOアプリ</h1>

      <form
        className="todo-form"
        onSubmit={(event) => {
          event.preventDefault()
          handleAddTodo()
        }}
      >
        <input
          type="text"
          placeholder="TODOを入力"
          aria-label="新しいTODO"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button type="submit">追加</button>
      </form>

      <div className="todo-controls">
        <div className="filters" aria-label="TODOの絞り込み">
          <button
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => setFilter('all')}
          >
            すべて
          </button>
          <button
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => setFilter('active')}
          >
            未完了
          </button>
          <button
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => setFilter('completed')}
          >
            完了
          </button>
        </div>
        <span className="todo-count">残り {activeCount} 件</span>
      </div>

      {visibleTodos.length === 0 ? (
        <p className="empty-message">表示するTODOはありません</p>
      ) : (
        <ul className="todo-list">
          {visibleTodos.map((todo) => (
            <li className={todo.completed ? 'completed' : ''} key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button
                className="delete-button"
                onClick={() => handleDeleteTodo(todo.id)}
                aria-label={`${todo.text}を削除`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        className="clear-button"
        onClick={handleClearCompleted}
        disabled={!hasCompletedTodo}
      >
        完了済みを削除
      </button>
    </main>
  )
}

export default App

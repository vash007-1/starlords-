import { create } from 'zustand'

export interface TodoItem {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
  updatedAt: string
}

interface TodoStore {
  todos: TodoItem[]
  addTodo: (title: string, description?: string, priority?: 'low' | 'medium' | 'high', dueDate?: string) => void
  updateTodo: (id: string, updates: Partial<TodoItem>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  getTodos: (filter?: 'all' | 'completed' | 'pending') => TodoItem[]
  loadTodos: () => void
  clearCompleted: () => void
}

const STORAGE_KEY = 'starlords_todos'

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  
  addTodo: (title, description, priority = 'medium', dueDate) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    set((state) => {
      const updatedTodos = [newTodo, ...state.todos]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos))
      return { todos: updatedTodos }
    })
  },
  
  updateTodo: (id, updates) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos))
      return { todos: updatedTodos }
    })
  },
  
  deleteTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos))
      return { todos: updatedTodos }
    })
  },
  
  toggleTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos))
      return { todos: updatedTodos }
    })
  },
  
  getTodos: (filter = 'all') => {
    const { todos } = get()
    switch (filter) {
      case 'completed':
        return todos.filter((t) => t.completed)
      case 'pending':
        return todos.filter((t) => !t.completed)
      default:
        return todos
    }
  },
  
  loadTodos: () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        set({ todos: JSON.parse(stored) })
      } catch (error) {
        console.error('Error loading todos:', error)
      }
    }
  },
  
  clearCompleted: () => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => !todo.completed)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos))
      return { todos: updatedTodos }
    })
  }
}))

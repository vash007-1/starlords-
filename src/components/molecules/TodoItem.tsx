import React from 'react'
import { Trash2, Edit2, CheckCircle2, Circle } from 'lucide-react'
import { useTodoStore, TodoItem } from '@stores/*'
import Button from '@components/atoms/Button'

interface TodoItemProps {
  todo: TodoItem
}

const TodoItemComponent: React.FC<TodoItemProps> = ({ todo }) => {
  const { deleteTodo, toggleTodo } = useTodoStore()

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
  }

  const priorityLabels = {
    low: 'منخفضة',
    medium: 'متوسطة',
    high: 'عالية'
  }

  return (
    <div
      className={`bg-white dark:bg-dark-surface rounded-lg shadow-sm p-4 transition-all ${
        todo.completed ? 'opacity-60' : ''
      } hover:shadow-md`}
    >
      <div className="flex gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleTodo(todo.id)}
          className="flex-shrink-0 mt-1 text-primary-500 hover:text-primary-600 transition-colors"
          aria-label="تبديل حالة المهمة"
        >
          {todo.completed ? (
            <CheckCircle2 size={24} className="text-green-500" />
          ) : (
            <Circle size={24} />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-base font-semibold ${
              todo.completed
                ? 'line-through text-neutral-500 dark:text-neutral-400'
                : 'text-neutral-1000 dark:text-white'
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm mt-1 ${
                todo.completed
                  ? 'line-through text-neutral-400 dark:text-neutral-500'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {todo.description}
            </p>
          )}
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[todo.priority]}`}>
              {priorityLabels[todo.priority]}
            </span>
            {todo.dueDate && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
                📅 {new Date(todo.dueDate).toLocaleDateString('ar-SA')}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTodo(todo.id)}
            className="text-red-600 hover:text-red-700 dark:text-red-400"
            aria-label="حذف المهمة"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TodoItemComponent

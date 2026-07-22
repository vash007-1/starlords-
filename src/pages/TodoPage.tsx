import React, { useState, useEffect } from 'react'
import { Plus, Trash2, AlertCircle } from 'lucide-react'
import { useTodoStore } from '../../stores'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import TodoItem from '../molecules/TodoItem'

const TodoPage: React.FC = () => {
  const { todos, addTodo, loadTodos, clearCompleted, getTodos } = useTodoStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [dueDate, setDueDate] = useState('')
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')

  useEffect(() => {
    loadTodos()
  }, [])

  const handleAddTodo = () => {
    if (title.trim()) {
      addTodo(title, description, priority, dueDate)
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
    }
  }

  const filteredTodos = getTodos(filter)
  const completedCount = getTodos('completed').length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-dark-primary dark:to-dark-surface p-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-neutral-1000 dark:text-white mb-2">قائمة المهام</h1>
        <p className="text-neutral-600 dark:text-neutral-400">تنظيم مهامك اليومية</p>
      </div>

      {/* Stats */}
      <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-dark-surface rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalCount}</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">إجمالي المهام</div>
        </div>
        <div className="bg-white dark:bg-dark-surface rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedCount}</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">مكتملة</div>
        </div>
        <div className="bg-white dark:bg-dark-surface rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {totalCount - completedCount}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">قيد التنفيذ</div>
        </div>
      </div>

      {/* Add Todo Form */}
      <div className="max-w-2xl mx-auto mb-8 bg-white dark:bg-dark-surface rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-neutral-1000 dark:text-white">إضافة مهمة جديدة</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="عنوان المهمة"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <textarea
            placeholder="وصف المهمة (اختياري)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-sm bg-white dark:bg-dark-primary text-neutral-1000 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-vertical min-h-20"
          />
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">الأولوية</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-sm bg-white dark:bg-dark-primary text-neutral-1000 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="low">منخفضة</option>
                <option value="medium">متوسطة</option>
                <option value="high">عالية</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">تاريخ الاستحقاق</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-sm bg-white dark:bg-dark-primary text-neutral-1000 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="primary"
                size="md"
                onClick={handleAddTodo}
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                إضافة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-2xl mx-auto mb-6 flex gap-2 flex-wrap">
        {(['all', 'pending', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              filter === f
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-dark-surface text-neutral-1000 dark:text-white hover:bg-neutral-100 dark:hover:bg-dark-surface-elevated'
            }`}
          >
            {f === 'all' ? 'الكل' : f === 'pending' ? 'قيد التنفيذ' : 'مكتملة'}
          </button>
        ))}
        {completedCount > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={clearCompleted}
            className="ml-auto"
          >
            <Trash2 size={16} className="ml-1" />
            حذف المكتملة
          </Button>
        )}
      </div>

      {/* Todos List */}
      <div className="max-w-2xl mx-auto space-y-3">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="text-center py-12">
            <AlertCircle size={48} className="mx-auto mb-4 text-neutral-400" />
            <p className="text-neutral-600 dark:text-neutral-400">
              {filter === 'all' && 'لا توجد مهام، أضف واحدة جديدة!'}
              {filter === 'pending' && 'رائع! أكملت جميع المهام 🎉'}
              {filter === 'completed' && 'لا توجد مهام مكتملة بعد'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoPage

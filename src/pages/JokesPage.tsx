import React, { useState } from 'react'
import { Laugh, Loader, RotateCw, Volume2 } from 'lucide-react'
import Button from '../atoms/Button'

interface Joke {
  id: number
  setup: string
  delivery: string
  type: string
}

const JokesPage: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jokeHistory, setJokeHistory] = useState<Joke[]>([])

  const fetchJoke = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      if (!response.ok) {
        throw new Error('فشل جلب النكتة')
      }
      const data: Joke = await response.json()
      setJoke(data)
      setJokeHistory([data, ...jokeHistory.slice(0, 9)])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في جلب النكتة'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const speakJoke = () => {
    if (!joke) return
    const text = `${joke.setup}... ${joke.delivery}`
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ar-SA'
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-dark-primary dark:to-dark-surface p-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-neutral-1000 dark:text-white mb-2 flex items-center gap-2">
          <Laugh size={40} className="text-yellow-500" />
          مولد النكات
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">احصل على نكات عشوائية مضحكة</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Joke Display */}
      <div className="max-w-2xl mx-auto mb-8">
        {loading ? (
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-8 text-center">
            <Loader size={48} className="mx-auto mb-4 animate-spin text-primary-500" />
            <p className="text-neutral-600 dark:text-neutral-400">جاري البحث عن نكتة مضحكة...</p>
          </div>
        ) : joke ? (
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-8 border-l-4 border-primary-500">
            <div className="mb-6">
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">❓ {joke.setup}</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">💬 {joke.delivery}</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="primary"
                size="md"
                onClick={fetchJoke}
                className="flex items-center gap-2"
              >
                <RotateCw size={20} />
                نكتة أخرى
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={speakJoke}
                className="flex items-center gap-2"
              >
                <Volume2 size={20} />
                استمع
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-8 text-center">
            <Laugh size={64} className="mx-auto mb-4 text-yellow-500 opacity-50" />
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">اضغط الزر أدناه لتحصل على نكتة عشوائية!</p>
            <Button
              variant="primary"
              size="md"
              onClick={fetchJoke}
              className="flex items-center justify-center gap-2 mx-auto"
            >
              <Laugh size={20} />
              احصل على نكتة
            </Button>
          </div>
        )}
      </div>

      {/* History */}
      {jokeHistory.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-1000 dark:text-white mb-4">📜 آخر النكات</h2>
          <div className="space-y-3">
            {jokeHistory.map((h, index) => (
              <div
                key={h.id}
                className="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setJoke(h)}
              >
                <p className="text-sm text-neutral-600 dark:text-neutral-400">#{index + 1}</p>
                <p className="text-neutral-1000 dark:text-white font-semibold truncate">{h.setup}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default JokesPage

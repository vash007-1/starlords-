import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">أحدث الأنمي</h2>
        <div className="grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-dark-surface rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-neutral-200 dark:bg-dark-surface-elevated" />
              <div className="p-2">
                <h3 className="text-sm font-medium truncate">اسم الأنمي</h3>
                <p className="text-xs text-neutral-500">2024</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

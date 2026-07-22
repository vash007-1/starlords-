import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-dark-primary dark:to-dark-surface p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-neutral-1000 dark:text-white mb-4">🌟 مرحباً بك في Starlords</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">منصة متعددة الأغراض مع مهام وطقس وفكاهة</p>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Todo Card */}
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-neutral-1000 dark:text-white mb-2">قائمة المهام</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">نظم مهامك اليومية مع الأولويات والتواريخ</p>
          <a href="/todo" className="text-primary-500 hover:text-primary-600 font-semibold">
            اذهب للمهام →
          </a>
        </div>

        {/* Weather Card */}
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">🌤️</div>
          <h2 className="text-2xl font-bold text-neutral-1000 dark:text-white mb-2">لوحة الطقس</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">تابع أحوال الطقس الحالية والتوقعات</p>
          <a href="/weather" className="text-primary-500 hover:text-primary-600 font-semibold">
            شاهد الطقس →
          </a>
        </div>

        {/* Jokes Card */}
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="text-4xl mb-4">😄</div>
          <h2 className="text-2xl font-bold text-neutral-1000 dark:text-white mb-2">مولد النكات</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">احصل على نكات عشوائية مضحكة كل يوم</p>
          <a href="/jokes" className="text-primary-500 hover:text-primary-600 font-semibold">
            شاهد النكات →
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">✨ المميزات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌙</span>
            <div>
              <h3 className="font-semibold">وضع ليلي</h3>
              <p className="text-blue-100 text-sm">دعم كامل للوضع الليلي والفاتح</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌍</span>
            <div>
              <h3 className="font-semibold">عربي RTL</h3>
              <p className="text-blue-100 text-sm">واجهة عربية احترافية بالكامل</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">💾</span>
            <div>
              <h3 className="font-semibold">تخزين محلي</h3>
              <p className="text-blue-100 text-sm">حفظ البيانات محلياً بأمان</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-semibold">أداء عالي</h3>
              <p className="text-blue-100 text-sm">سرعة فائقة مع React 18</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

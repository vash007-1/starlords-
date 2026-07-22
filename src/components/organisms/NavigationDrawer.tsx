import React from 'react'
import { X, Home, List, Calendar } from 'lucide-react'
import { useUIStore } from '@stores/*'
import Button from '@components/atoms/Button'

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
}

const NavigationDrawer: React.FC = () => {
  const { toggleDrawer } = useUIStore()

  const menuItems: NavItem[] = [
    { icon: <Home size={20} />, label: 'الصفحة الرئيسية', href: '/' },
    { icon: <List size={20} />, label: 'قائمة الأنمي', href: '/anime-list' },
    { icon: <Calendar size={20} />, label: 'المواسم', href: '/seasons' }
  ]

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 animate-fade-in"
        onClick={toggleDrawer}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-[85%] max-w-xs bg-white dark:bg-dark-surface shadow-lg animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-neutral-1000 dark:text-white">القائمة</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDrawer}
            aria-label="إغلاق القائمة"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="p-2 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                // TODO: Navigate to item.href
                toggleDrawer()
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-neutral-1000 dark:text-white hover:bg-neutral-50 dark:hover:bg-dark-surface-elevated rounded-md transition-colors"
            >
              {item.icon}
              <span className="text-base font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

export default NavigationDrawer

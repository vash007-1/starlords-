import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSquare, Cloud, Home, LogOut } from 'lucide-react'
import { useUIStore, useThemeStore, useAuthStore } from '@stores/*'
import Button from '@components/atoms/Button'

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
}

const NavigationDrawer: React.FC = () => {
  const { toggleDrawer } = useUIStore()
  const { toggleTheme, isDark } = useThemeStore()
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const menuItems: NavItem[] = [
    { icon: <Home size={20} />, label: 'الصفحة الرئيسية', href: '/' },
    { icon: <CheckSquare size={20} />, label: 'قائمة المهام', href: '/todo' },
    { icon: <Cloud size={20} />, label: 'الطقس', href: '/weather' }
  ]

  const handleNavigation = (href: string) => {
    navigate(href)
    toggleDrawer()
  }

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
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-primary-500 to-primary-600">
          <h2 className="text-xl font-bold text-white">القائمة</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDrawer}
            className="text-white hover:bg-primary-400"
            aria-label="إغلاق القائمة"
          >
            ✕
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="p-2 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 text-neutral-1000 dark:text-white hover:bg-neutral-50 dark:hover:bg-dark-surface-elevated rounded-md transition-colors"
            >
              {item.icon}
              <span className="text-base font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-neutral-200 dark:border-neutral-800" />

        {/* Settings */}
        <div className="p-2 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 text-neutral-1000 dark:text-white hover:bg-neutral-50 dark:hover:bg-dark-surface-elevated rounded-md transition-colors"
          >
            {isDark ? '☀️' : '🌙'}
            <span className="text-base font-medium">{isDark ? 'الوضع الفاتح' : 'الوضع الليلي'}</span>
          </button>
          <button
            onClick={() => {
              logout()
              toggleDrawer()
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          >
            <LogOut size={20} />
            <span className="text-base font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default NavigationDrawer

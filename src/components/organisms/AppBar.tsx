import React from 'react'
import { Menu, Search, Grid3x3 } from 'lucide-react'
import { useUIStore, useThemeStore } from '../stores'
import Button from '../atoms/Button'

const AppBar: React.FC = () => {
  const { toggleDrawer } = useUIStore()
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <div className="sticky top-0 z-50 h-14 bg-white dark:bg-dark-surface border-b border-neutral-200 dark:border-neutral-800">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Menu Button - Right */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDrawer}
          className="rounded-full"
          aria-label="القائمة"
        >
          <Menu size={24} />
        </Button>

        {/* Logo - Center */}
        <h1 className="text-lg font-bold text-neutral-1000 dark:text-white">Starlords</h1>

        {/* Action Buttons - Left */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="البحث"
          >
            <Search size={24} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="تبديل الوضع"
          >
            {isDark ? '☀️' : '🌙'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppBar

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore, useUIStore, useAuthStore } from '@stores/*'
import AppBar from '@components/organisms/AppBar'
import NavigationDrawer from '@components/organisms/NavigationDrawer'
import HomePage from '@pages/HomePage'
import './App.css'

function App() {
  const { initializeTheme } = useThemeStore()
  const { isDrawerOpen } = useUIStore()
  const { setIsLoading } = useAuthStore()

  useEffect(() => {
    // Initialize theme
    initializeTheme()

    // Check auth status
    setIsLoading(false)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 dark:bg-dark-primary text-neutral-1000 dark:text-dark-primary">
        <AppBar />
        {isDrawerOpen && <NavigationDrawer />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

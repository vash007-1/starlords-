import React, { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, MapPin, Search, Heart, Trash2 } from 'lucide-react'
import { useWeatherStore } from '../../stores'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import WeatherCard from '../molecules/WeatherCard'
import ForecastCard from '../molecules/ForecastCard'

const WeatherPage: React.FC = () => {
  const { weather, isLoading, error, savedLocations, fetchWeather, addSavedLocation, removeSavedLocation } = useWeatherStore()
  const [searchCity, setSearchCity] = useState('')

  useEffect(() => {
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather('', position.coords.latitude, position.coords.longitude)
        },
        () => {
          // Fallback to Cairo
          fetchWeather('Cairo')
        }
      )
    } else {
      fetchWeather('Cairo')
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchCity.trim()) {
      fetchWeather(searchCity)
      setSearchCity('')
    }
  }

  const handleSaveLocation = () => {
    if (weather?.city) {
      addSavedLocation(weather.city)
    }
  }

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="text-yellow-400" size={64} />
    if (iconCode.includes('02') || iconCode.includes('03')) return <Cloud className="text-gray-400" size={64} />
    if (iconCode.includes('04')) return <Cloud className="text-gray-500" size={64} />
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="text-blue-400" size={64} />
    if (iconCode.includes('11')) return <CloudRain className="text-blue-600" size={64} />
    return <Cloud size={64} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-dark-primary dark:to-dark-surface p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-neutral-1000 dark:text-white mb-2">لوحة الطقس</h1>
        <p className="text-neutral-600 dark:text-neutral-400">تابع الطقس في موقعك الحالي</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="ابحث عن مدينة..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="primary" size="md" className="flex items-center gap-2">
            <Search size={20} />
            بحث
          </Button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Current Weather */}
      {isLoading ? (
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="inline-block animate-spin">
            <Cloud size={48} className="text-primary-500" />
          </div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">جاري تحميل بيانات الطقس...</p>
        </div>
      ) : weather ? (
        <>
          {/* Weather Details */}
          <div className="max-w-4xl mx-auto mb-8 bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold">{weather.city}</h2>
                  <p className="text-blue-100">🌍 {weather.country}</p>
                </div>
                <div className="text-right">
                  {getWeatherIcon(weather.icon)}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-6xl font-bold">{weather.temperature}°</div>
                  <p className="text-lg text-blue-100 mt-2">{weather.description}</p>
                </div>
                <div className="text-sm text-blue-100">
                  <p>يشعر كـ {weather.feelsLike}°</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-8 py-4 border-b border-neutral-200 dark:border-neutral-700 flex gap-2">
              {!savedLocations.includes(weather.city) ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSaveLocation}
                  className="flex items-center gap-2"
                >
                  <Heart size={18} />
                  حفظ الموقع
                </Button>
              ) : (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeSavedLocation(weather.city)}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  إزالة
                </Button>
              )}
            </div>

            {/* Weather Metrics Grid */}
            <div className="px-8 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <WeatherCard
                icon={<Droplets className="text-blue-500" size={24} />}
                label="الرطوبة"
                value={`${weather.humidity}%`}
              />
              <WeatherCard
                icon={<Wind className="text-cyan-500" size={24} />}
                label="سرعة الرياح"
                value={`${weather.windSpeed.toFixed(1)} م/ث`}
              />
              <WeatherCard
                icon={<Gauge className="text-purple-500" size={24} />}
                label="الضغط"
                value={`${weather.pressure} hPa`}
              />
              <WeatherCard
                icon={<Eye className="text-green-500" size={24} />}
                label="الرؤية"
                value={`${weather.visibility?.toFixed(1)} كم`}
              />
              <WeatherCard
                icon={<Sun className="text-yellow-500" size={24} />}
                label="الشروق"
                value={weather.sunrise}
              />
              <WeatherCard
                icon={<Cloud className="text-indigo-500" size={24} />}
                label="الغروب"
                value={weather.sunset}
              />
            </div>
          </div>

          {/* Forecast */}
          {weather.forecast && weather.forecast.length > 0 && (
            <div className="max-w-4xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-neutral-1000 dark:text-white mb-4">التنبؤ ليومات القادمة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {weather.forecast.map((day, index) => (
                  <ForecastCard key={index} day={day} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}

      {/* Saved Locations */}
      {savedLocations.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-neutral-1000 dark:text-white mb-4">المواقع المحفوظة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedLocations.map((city) => (
              <button
                key={city}
                onClick={() => fetchWeather(city)}
                className="p-4 bg-white dark:bg-dark-surface rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 text-center"
              >
                <MapPin size={20} className="mx-auto mb-2 text-primary-500" />
                <p className="font-medium text-neutral-1000 dark:text-white truncate">{city}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherPage

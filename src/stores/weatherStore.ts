import { create } from 'zustand'

export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  pressure: number
  windSpeed: number
  description: string
  icon: string
  sunrise: string
  sunset: string
  uvIndex?: number
  visibility?: number
  forecast?: DayForecast[]
}

export interface DayForecast {
  date: string
  high: number
  low: number
  description: string
  icon: string
  precipitation?: number
  windSpeed?: number
}

interface WeatherStore {
  weather: WeatherData | null
  isLoading: boolean
  error: string | null
  savedLocations: string[]
  fetchWeather: (city: string, lat?: number, lon?: number) => Promise<void>
  setError: (error: string | null) => void
  addSavedLocation: (city: string) => void
  removeSavedLocation: (city: string) => void
  getSavedLocations: () => string[]
}

const STORAGE_KEY = 'starlords_weather_locations'
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || ''

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  weather: null,
  isLoading: false,
  error: null,
  savedLocations: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  
  fetchWeather: async (city: string, lat?: number, lon?: number) => {
    set({ isLoading: true, error: null })
    try {
      let url: string
      
      if (lat && lon) {
        // Use coordinates
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ar&appid=${OPENWEATHER_API_KEY}`
      } else {
        // Use city name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ar&appid=${OPENWEATHER_API_KEY}`
      }
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('مدينة غير موجودة')
      }
      
      const data = await response.json()
      
      // Fetch forecast data
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&units=metric&lang=ar&appid=${OPENWEATHER_API_KEY}`
      const forecastResponse = await fetch(forecastUrl)
      const forecastData = forecastResponse.ok ? await forecastResponse.json() : null
      
      const weather: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('ar-SA'),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('ar-SA'),
        visibility: data.visibility / 1000,
        uvIndex: data.uvi,
        forecast: forecastData
          ? forecastData.list
              .filter((_: any, index: number) => index % 8 === 0)
              .slice(0, 5)
              .map((item: any) => ({
                date: new Date(item.dt * 1000).toLocaleDateString('ar-SA'),
                high: Math.round(item.main.temp_max),
                low: Math.round(item.main.temp_min),
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                precipitation: item.pop ? Math.round(item.pop * 100) : 0,
                windSpeed: item.wind.speed
              }))
          : []
      }
      
      set({ weather, isLoading: false })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ في جلب بيانات الطقس'
      set({ error: errorMessage, isLoading: false })
    }
  },
  
  setError: (error) => set({ error }),
  
  addSavedLocation: (city) => {
    set((state) => {
      const updated = [...new Set([city, ...state.savedLocations])]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return { savedLocations: updated }
    })
  },
  
  removeSavedLocation: (city) => {
    set((state) => {
      const updated = state.savedLocations.filter((c) => c !== city)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return { savedLocations: updated }
    })
  },
  
  getSavedLocations: () => get().savedLocations
}))

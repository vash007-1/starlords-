import React from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react'
import { DayForecast } from '@stores/*'

interface ForecastCardProps {
  day: DayForecast
}

const ForecastCard: React.FC<ForecastCardProps> = ({ day }) => {
  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun className="text-yellow-400" size={32} />
    if (iconCode.includes('02') || iconCode.includes('03')) return <Cloud className="text-gray-400" size={32} />
    if (iconCode.includes('04')) return <Cloud className="text-gray-500" size={32} />
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="text-blue-400" size={32} />
    if (iconCode.includes('11')) return <CloudRain className="text-blue-600" size={32} />
    return <Cloud size={32} />
  }

  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow">
      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-3">{day.date}</p>
      <div className="flex justify-center mb-3">{getWeatherIcon(day.icon)}</div>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">{day.description}</p>
      <div className="flex justify-between items-center text-sm mb-3">
        <div>
          <span className="text-blue-600 dark:text-blue-400 font-bold">{day.high}°</span>
        </div>
        <div>
          <span className="text-blue-400 dark:text-blue-300 font-bold">{day.low}°</span>
        </div>
      </div>
      {day.precipitation !== undefined && (
        <div className="flex items-center justify-center gap-1 text-xs text-blue-600 dark:text-blue-400">
          <Droplets size={14} />
          {day.precipitation}%
        </div>
      )}
      {day.windSpeed && (
        <div className="flex items-center justify-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 mt-2">
          <Wind size={14} />
          {day.windSpeed.toFixed(1)} م/ث
        </div>
      )}
    </div>
  )
}

export default ForecastCard

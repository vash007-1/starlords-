import React from 'react'

interface WeatherCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
}

const WeatherCard: React.FC<WeatherCardProps> = ({ icon, label, value }) => {
  return (
    <div className="bg-gray-50 dark:bg-dark-surface-elevated rounded-lg p-3 text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-neutral-1000 dark:text-white">{value}</p>
    </div>
  )
}

export default WeatherCard

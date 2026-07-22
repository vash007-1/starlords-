import React from 'react'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  circle?: boolean
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  circle = false,
  className = ''
}) => {
  return (
    <div
      className={`skeleton-loading ${circle ? 'rounded-full' : 'rounded-sm'} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
    />
  )
}

export default Skeleton

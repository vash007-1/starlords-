import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, className = '', ...props }, ref) => {
    const baseClasses = 'font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
      primary:
        'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:outline-primary-500',
      secondary:
        'bg-neutral-100 text-neutral-1000 hover:bg-neutral-200 active:bg-neutral-300 focus-visible:outline-neutral-500 dark:bg-dark-surface-elevated dark:text-white',
      ghost:
        'bg-transparent text-neutral-1000 hover:bg-neutral-50 active:bg-neutral-100 dark:text-white dark:hover:bg-dark-surface',
      danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700 focus-visible:outline-error'
    }

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs rounded-xs',
      md: 'px-4 py-2 text-md rounded-sm',
      lg: 'px-6 py-3 text-lg rounded-md',
      icon: 'w-10 h-10 flex items-center justify-center p-0'
    }

    return (
      <button
        ref={ref}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            جاري التحميل...
          </span>
        ) : (
          props.children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

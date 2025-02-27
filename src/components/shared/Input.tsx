import React, { InputHTMLAttributes, forwardRef } from "react"
import { FaSearch, FaWindowClose } from "react-icons/fa"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "general" | "search" | "clause"
  label?: string
  error?: string
  helperText?: string
  isSuccess?: boolean
  onClear?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "general",
      label,
      error,
      helperText,
      isSuccess,
      className,
      onClear,
      disabled,
      ...props
    },
    ref
  ) => {
    const getInputStyles = () => {
      const baseStyles =
        "w-44 rounded-md border p-10 h-10 text-sm transition-colors focus:outline-none"

      if (disabled) {
        return `${baseStyles} bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed`
      }

      if (error) {
        return `${baseStyles} border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500`
      }

      if (isSuccess) {
        return `${baseStyles} border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500`
      }

      return `${baseStyles} border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`
    }

    const renderInput = () => {
      switch (variant) {
        case "search":
          return (
            <div className='relative'>
              <FaSearch className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <input
                ref={ref}
                className={`${getInputStyles()} ${className} pl-10 pr-8`}
                type='search'
                disabled={disabled}
                {...props}
              />
              {props.value && !disabled && (
                <button
                  type='button'
                  onClick={onClear}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  <FaWindowClose className='h-4 w-4' />
                </button>
              )}
            </div>
          )

        case "clause":
          return (
            <div className='relative'>
              <input
                ref={ref}
                className={`${getInputStyles()}  ${className} pr-8`}
                disabled={disabled}
                {...props}
              />
              {!disabled && (
                <button
                  type='button'
                  onClick={onClear}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  <FaWindowClose className='h-4 w-4' />
                </button>
              )}
            </div>
          )

        default:
          return (
            <input
              ref={ref}
              className={getInputStyles()}
              disabled={disabled}
              {...props}
            />
          )
      }
    }

    return (
      <div className='space-y-1'>
        {label && (
          <label className='block text-sm font-medium text-gray-700'>
            {label}
          </label>
        )}
        {renderInput()}
        {(error || helperText) && (
          <p className={`text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input

import React, { InputHTMLAttributes, forwardRef, useState } from "react"
import { FaSearch, FaWindowClose } from "react-icons/fa"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search" | "clause" | "phone" | "phoneWithCountry"
  label?: string
  error?: string
  helperText?: string
  isSuccess?: boolean
  onClear?: () => void
}

const countryCodes = [
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+234", country: "Nigeria" },
  { code: "+91", country: "India" },
]

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
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
    const [selectedCountryCode, setSelectedCountryCode] = useState(
      countryCodes[0].code
    )

    const getInputStyles = () => {
      const baseStyles =
        "w-full rounded-md border p-2 h-10 text-sm transition-colors focus:outline-none"

      if (disabled) {
        return `${baseStyles} bg-grey border-grey text-grey cursor-not-allowed`
      }

      if (error) {
        return `${baseStyles} border-red/80 focus:border-red focus:ring-1 focus:ring-red`
      }

      if (isSuccess) {
        return `${baseStyles} border-green focus:border-green focus:ring-1 focus:ring-green`
      }

      return `${baseStyles} border-grey hover:border-primary/80 focus:ring focus:ring-primary`
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
                className={`${getInputStyles()} ${className} pr-8`}
                disabled={disabled}
                {...props}
              />
              {!disabled && (
                <button
                  type='button'
                  onClick={onClear}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-grey/90 hover:text-grey'
                >
                  <FaWindowClose className='h-4 w-4' />
                </button>
              )}
            </div>
          )

        case "phoneWithCountry":
          return (
            <div className='flex items-center space-x-2'>
              <select
                className='border rounded-md p-2 h-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                value={selectedCountryCode}
              >
                {countryCodes.map((code) => (
                  <option key={code.code} value={code.code}>
                    {code.country} ({code.code})
                  </option>
                ))}
              </select>
              <input
                ref={ref}
                className={`${getInputStyles()} ${className}`}
                placeholder={selectedCountryCode}
                disabled={disabled}
                {...props}
              />
            </div>
          )

        default:
          return (
            <input
              ref={ref}
              className={`${getInputStyles()} ${className}`}
              disabled={disabled}
              {...props}
            />
          )
      }
    }

    return (
      <div className='space-y-1'>
        {label && (
          <label className='block text-sm font-medium text-lnblack'>
            {label}
          </label>
        )}
        {renderInput()}
        {(error || helperText) && (
          <p className={`text-sm ${error ? "text-red" : "text-grey"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input

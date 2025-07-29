import React, { InputHTMLAttributes, forwardRef, useState } from "react"
import {
  FaSearch,
  FaWindowClose,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaHome,
  FaEnvelope,
} from "react-icons/fa"
import {
  PiAt,
  PiGlobe,
  PiPhone,
  PiUser,
  // PiWallet,
} from "react-icons/pi"

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  variant?:
    | "default"
    | "search"
    | "clause"
    | "phone"
    | "phoneWithCountry"
    | "password"
    | "select"
    | "withIcon"
  label?: string
  error?: string
  helperText?: string
  isSuccess?: boolean
  onClear?: () => void
  icon?: React.ReactNode
  options?: { value: string; label: string }[]
  showPasswordToggle?: boolean
}

const countryCodes = [
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+234", country: "Nigeria" },
  { code: "+91", country: "India" },
]

// Icon mapping for common field types
const getIconForField = (label?: string, type?: string): React.ReactNode => {
  if (!label) return null

  const labelLower = label.toLowerCase()

  if (labelLower.includes("name") || labelLower.includes("full name")) {
    return <PiUser className='w-4 h-4' />
  }
  if (labelLower.includes("phone")) {
    return <PiPhone className='w-4 h-4' />
  }
  if (labelLower.includes("email")) {
    return <FaEnvelope className='w-4 h-4' />
  }
  if (labelLower.includes("country")) {
    return <PiGlobe className='w-4 h-4' />
  }
  if (
    labelLower.includes("state") ||
    labelLower.includes("lga") ||
    labelLower.includes("location")
  ) {
    return <FaMapMarkerAlt className='w-4 h-4' />
  }
  if (labelLower.includes("address") || labelLower.includes("street")) {
    return <FaHome className='w-4 h-4' />
  }
  if (type === "email") {
    return <PiAt className='w-4 h-4' />
  }

  return null
}

const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
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
      children,
      icon,
      options,
      showPasswordToggle = false,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [selectedCountryCode, setSelectedCountryCode] = useState(
      countryCodes[0].code
    )
    const [showPassword, setShowPassword] = useState(false)

    // Auto-detect icon if none provided
    const displayIcon = icon || getIconForField(label, type)

    const getInputStyles = () => {
      const baseStyles =
        "w-full rounded-md border transition-colors focus:outline-none"

      // Different sizing based on variant
      const sizeStyles =
        variant === "withIcon" || variant === "select"
          ? "p-3 h-10 text-sm"
          : "p-2 h-10 text-sm"

      if (disabled) {
        return `${baseStyles} ${sizeStyles} bg-gray border-grey text-grey cursor-not-allowed`
      }

      if (error) {
        return `${baseStyles} ${sizeStyles} border-red focus:border-red-500 focus:ring-1 focus:ring-red-500`
      }

      if (isSuccess) {
        return `${baseStyles} ${sizeStyles} border-green focus:border-green/90 focus:ring-1 focus:ring-green/60`
      }

      return `${baseStyles} ${sizeStyles} border-gray hover:border-primary/70 focus:ring-2 focus:ring-primary focus:border-transparent`
    }

    const renderInput = () => {
      const inputType = showPasswordToggle && showPassword ? "text" : type

      switch (variant) {
        case "search":
          return (
            <div className='relative'>
              <FaSearch className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey' />
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                className={`${getInputStyles()} ${className} pl-10 pr-8`}
                type='search'
                disabled={disabled}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
              />
              {props.value && !disabled && (
                <button
                  type='button'
                  onClick={onClear}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-lnblack'
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
                ref={ref as React.RefObject<HTMLInputElement>}
                className={`${getInputStyles()} ${className} pr-8`}
                disabled={disabled}
                type={inputType}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
              />
              {!disabled && (
                <button
                  type='button'
                  onClick={onClear}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-lnblack'
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
                className='border border-gray-300 rounded-md p-3 h-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
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
                ref={ref as React.RefObject<HTMLInputElement>}
                className={`${getInputStyles()} ${className}`}
                placeholder={selectedCountryCode}
                disabled={disabled}
                type={inputType}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
              />
            </div>
          )

        case "password":
          return (
            <div className='relative'>
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                className={`${getInputStyles()} ${className} ${
                  showPasswordToggle ? "pr-10" : ""
                }`}
                type={showPassword ? "text" : "password"}
                disabled={disabled}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
              />
              {showPasswordToggle && (
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-lnblack'
                >
                  {showPassword ? (
                    <FaEyeSlash className='h-4 w-4' />
                  ) : (
                    <FaEye className='h-4 w-4' />
                  )}
                </button>
              )}
            </div>
          )

        case "select":
          return (
            <div className='relative'>
              <select
                ref={ref as React.RefObject<HTMLSelectElement>}
                className={`${getInputStyles()} ${className} appearance-none bg-white`}
                disabled={disabled}
                {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
              >
                <option value=''>{props.placeholder || "Select option"}</option>
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-grey'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          )

        case "withIcon":
          return (
            <div className='relative'>
              {displayIcon && (
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-grey'>
                  {displayIcon}
                </div>
              )}
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                className={`${getInputStyles()} ${className} ${
                  displayIcon ? "pl-10" : "pl-3"
                } ${showPasswordToggle ? "pr-10" : "pr-3"}`}
                type={inputType}
                disabled={disabled}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
              />
              {showPasswordToggle && (
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-lnblack'
                >
                  {showPassword ? (
                    <FaEyeSlash className='h-4 w-4' />
                  ) : (
                    <FaEye className='h-4 w-4' />
                  )}
                </button>
              )}
            </div>
          )

        default:
          return (
            <div className='relative'>
              <input
                ref={ref as React.RefObject<HTMLInputElement>}
                className={`${getInputStyles()} ${className} ${
                  showPasswordToggle ? "pr-10" : "pr-3"
                }`}
                type={inputType}
                disabled={disabled}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
              >
                {children}
              </input>
              {showPasswordToggle && (
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-lnblack'
                >
                  {showPassword ? (
                    <FaEyeSlash className='h-4 w-4' />
                  ) : (
                    <FaEye className='h-4 w-4' />
                  )}
                </button>
              )}
            </div>
          )
      }
    }

    return (
      <div className='space-y-1'>
        {label && (
          <label className='block text-sm font-medium text-gray-900'>
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

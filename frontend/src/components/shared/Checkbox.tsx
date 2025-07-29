// components/shared/Checkbox.tsx
import React, { useState, useEffect } from "react"
import { FaCheck } from "react-icons/fa"

interface CheckboxProps {
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
  id?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  label = "Remember me",
  checked = false,
  onChange,
  disabled = false,
  className = "",
  size = "md",
  id,
}) => {
  const [isChecked, setIsChecked] = useState(checked)

  // Update internal state when checked prop changes
  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleChange = () => {
    if (disabled) return

    const newChecked = !isChecked
    setIsChecked(newChecked)
    onChange?.(newChecked)
  }

  // Size configurations
  const sizeConfig = {
    sm: {
      checkbox: "w-4 h-4",
      text: "text-sm",
      icon: "text-xs",
    },
    md: {
      checkbox: "w-5 h-5",
      text: "text-base",
      icon: "text-sm",
    },
    lg: {
      checkbox: "w-6 h-6",
      text: "text-lg",
      icon: "text-base",
    },
  }

  const config = sizeConfig[size]

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Custom Checkbox */}
      <div className='relative'>
        <input
          type='checkbox'
          id={id}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className='sr-only' // Hide the default checkbox
        />
        <div
          onClick={handleChange}
          className={`
            ${config.checkbox}
            border-2 rounded
            flex items-center justify-center
            transition-all duration-200
            ${
              isChecked
                ? "border-primary bg-primary"
                : "bg-white border-primary hover:bg-primary/10"
            }
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:border-primary"
            }
          `}
        >
          {isChecked && (
            <FaCheck
              className={`${config.icon} text-white transition-all duration-200`}
            />
          )}
        </div>
      </div>

      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          onClick={handleChange}
          className={`
            ${config.text}
            text-lnblack select-none
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox

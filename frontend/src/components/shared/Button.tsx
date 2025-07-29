// components/shared/Button.tsx
import React, { ReactNode, ButtonHTMLAttributes } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | ReactNode
  icon?: "left" | "right" | null
  hasBg?: boolean
  onClick?: () => void
  className?: string
  isToggle?: boolean
  isActive?: boolean
  textColor?: string
  bgColor?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  hasBg = true,
  onClick,
  className = "",
  isToggle = false,
  isActive = false,
  disabled = false,
  textColor,
  bgColor,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "p-3 rounded-md text-sm text-center flex justify-center font-semibold transition-all cursor-pointer"

  const bgStyles = hasBg
    ? `${bgColor || "bg-primary"} ${textColor || "text-white"} hover:opacity-80`
    : "border border-gray text-gray hover:bg-gray"

  const activeStyles = isToggle && isActive ? "bg-green text-white" : ""

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed hover:opacity-50"
    : ""

  return (
    <button
      type={type}
      className={`${baseStyles} ${bgStyles} ${activeStyles} ${disabledStyles} ${className} flex items-center space-x-2`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {icon === "left" && <FaArrowLeft className='h-4 w-4' />}
      {label && <span>{label}</span>}
      {icon === "right" && <FaArrowRight className='h-4 w-4' />}
    </button>
  )
}

export default Button

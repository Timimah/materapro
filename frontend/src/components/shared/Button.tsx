import React from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

interface ButtonProps {
  label?: string
  icon?: "left" | "right" | null
  hasBg?: boolean
  onClick?: () => void
  className?: string
  isToggle?: boolean
  isActive?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  hasBg = true,
  onClick,
  className = "",
  isToggle = false,
  isActive = false,
}) => {
  const baseStyles =
    "p-3 rounded-md text-sm text-center flex justify-center font-semibold transition-all"
  const bgStyles = hasBg
    ? "bg-blue-500 text-white hover:bg-blue-600"
    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
  const activeStyles = isToggle && isActive ? "bg-green-500 text-white" : ""

  return (
    <button
      className={`${baseStyles} ${bgStyles} ${activeStyles} ${className} flex items-center space-x-2`}
      onClick={onClick}
    >
      {icon === "left" && <FaArrowLeft className='h-4 w-4' />}
      {label && <span>{label}</span>}
      {icon === "right" && <FaArrowRight className='h-4 w-4' />}
    </button>
  )
}

export default Button

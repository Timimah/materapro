import React from "react"
import { FormEvent, ChangeEvent } from "react"

interface InputProps {
  label: string
  placeholder?: string
  helperText?: string
  error?: string
  isSuccess?: boolean
  disabled?: boolean
  value?: string
  type?: string
  required?: boolean
  variant?: "default" | "search" | "clause"
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

const Input = ({
  label,
  placeholder,
  helperText,
  error,
  isSuccess,
  disabled,
  value,
  type = "text",
  required,
  variant = "default",
  onChange,
  onClear,
}: InputProps) => {
  return (
    <div className='relative'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
          error
            ? "border-red-500 focus:ring-red-200"
            : isSuccess
            ? "border-green-500 focus:ring-green-200"
            : "border-gray-300 focus:ring-blue-200"
        }`}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      {helperText && !error && (
        <p className='mt-1 text-sm text-gray-500'>{helperText}</p>
      )}
      {variant !== "default" && onClear && value && (
        <button
          type='button'
          onClick={onClear}
          className='absolute right-2 top-8 text-gray-400 hover:text-gray-600'
        >
          ×
        </button>
      )}
    </div>
  )
}

function forms() {
  // const [searchValue, setSearchValue] = useState("")
  // const [clauseValue, setClauseValue] = useState("")
  // const [email, setEmail] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    alert("Form submitted!")
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Contact Us</h1>
          <p className='text-gray-600'>
            Get in touch with us for any questions or concerns
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className='bg-white p-6 rounded-xl shadow-sm'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <Input label='Name' placeholder='Your name' required />
              <Input
                label='Email'
                type='email'
                placeholder='Your email'
                required
              />
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Message
                </label>
                <textarea
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                  rows={6}
                  placeholder='Your message'
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default forms

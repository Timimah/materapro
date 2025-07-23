import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='min-h-screen flex flex-col justify-center items-center px-6'>
      <h1 className='text-2xl font-bold mb-6'>Log in</h1>
      <form className='w-full max-w-sm space-y-4'>
        <input
          type='email'
          placeholder='Email'
          className='w-full px-4 py-2 border rounded-md'
        />
        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='Password'
            className='w-full px-4 py-2 border rounded-md'
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-2.5 cursor-pointer text-gray-500'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className='w-full bg-blue-600 text-white py-2 rounded-md'>
          Log in
        </button>
        <p className='text-sm text-center'>
          Don't have an account?{" "}
          <a href='/signup' className='text-blue-600'>
            Create account
          </a>
        </p>
      </form>
    </div>
  )
}

import { useState, FormEvent, ChangeEvent } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import logo from "@assets/shared/logo.png"
import Input from "@/components/shared/Input"
import Button from "@/components/shared/Button"
import Checkbox from "@/components/shared/Checkbox"
import { useAuth } from "@/hooks/useAuth"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      })

      // Navigation will be handled automatically by AuthRoute/ProtectedRoute
    } catch (error) {
      // Error is handled by the auth context
      console.error("Login failed:", error)
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      email: e.target.value,
    }))
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }))
  }

  const handleRememberMeChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }))
  }

  return (
    <div className='min-h-screen flex flex-col items-center px-6 bg-gray2'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='flex justify-center mt-6 mb-2 w-40 h-25 mx-auto'
      >
        <img src={logo} alt='materapro logo' className='object-cover w-max' />
      </motion.div>

      <div className='text-center mb-8 max-w-sm'>
        <h1 className='text-2xl font-bold text-gray-900 mb-3'>Log in</h1>
        <p className='text-lnblack text-sm leading-relaxed'>
          Welcome back to MateraPro, Come on in now to continue with us.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-sm space-y-2 md:mb-20'
      >
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm'>
            {error}
          </div>
        )}

        <div className='space-y-6'>
          <Input
            label='Email'
            type='email'
            placeholder='example@gmail.com'
            value={formData.email}
            onChange={handleEmailChange}
            required
          />

          <div className='relative'>
            <Input
              label='Password'
              type={showPassword ? "text" : "password"}
              placeholder='8+ characters'
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 bottom-2.5 cursor-pointer text-gray-500'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className='flex justify-between'>
          <Checkbox
            label='Remember me'
            size='sm'
            checked={formData.rememberMe}
            onChange={handleRememberMeChange}
          />
          <Link
            to='/forgot-password'
            className='text-lnblack text-sm underline'
          >
            Forgot Password?
          </Link>
        </div>

        <div className='absolute bottom-6 left-6 right-6 max-w-sm mx-auto'>
          <Button
            type='submit'
            label={isLoading ? "Logging in..." : "Log in"}
            className='bg-primary w-full text-white'
            disabled={isLoading}
          />
          <p className='text-sm text-center text-lnblack mt-2'>
            Don't have an account?{" "}
            <Link to='/register' className='text-primary underline font-bold'>
              Create account
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

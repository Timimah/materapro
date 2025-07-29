// src/pages/shared/CreateAccount.tsx
import { useState, FormEvent, ChangeEvent } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import logo from "@assets/shared/logo.png"
import Input from "@/components/shared/Input"
import Button from "@/components/shared/Button"
import Checkbox from "@/components/shared/Checkbox"
import { useAuth } from "@/hooks/useAuth"
import { UserType } from "@/types/user"
import google from "@/assets/app/google.png"
import facebook from "@/assets/app/fb.png"

interface CreateAccountFormData {
  fullName: string
  email: string
  password: string
  userType: UserType
  agreeToTerms: boolean
}

interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
}

const userTypes: { type: UserType; label: string }[] = [
  { type: "supervisor", label: "Supervisor" },
  { type: "client", label: "Client" },
  { type: "artisan", label: "Artisan" },
]

export default function CreateAccount() {
  const [formData, setFormData] = useState<CreateAccountFormData>({
    fullName: "",
    email: "",
    password: "",
    userType: "client",
    agreeToTerms: false,
  })

  const { register, isLoading, error } = useAuth()
  const navigate = useNavigate()

  // Password strength checker
  const checkPasswordStrength = (password: string): PasswordStrength => {
    let score = 0
    const feedback: string[] = []

    if (password.length >= 8) score += 1
    else feedback.push("At least 8 characters")

    if (/[a-z]/.test(password)) score += 1
    else feedback.push("Must have at least one symbol (a-z)")

    if (/[A-Z]/.test(password)) score += 1
    else feedback.push("Must have at least one upper case")

    if (/\d/.test(password)) score += 1
    else feedback.push("Must have at least one number")

    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"]
    return {
      score,
      feedback,
      color: colors[Math.min(score - 1, 3)] || colors[0],
    }
  }

  const passwordStrength = checkPasswordStrength(formData.password)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      return
    }

    try {
      await register(
        {
          name: formData.fullName,
          email: formData.email,
          type: formData.userType,
        },
        formData.password
      )

      // After successful registration, navigate to welcome page
      // The name will be automatically available in the user object
      navigate("/client/account-setup")
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  const handleInputChange =
    (field: keyof CreateAccountFormData) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }))
    }

  const handleCheckboxChange =
    (field: keyof CreateAccountFormData) => (checked: boolean) => {
      setFormData((prev) => ({
        ...prev,
        [field]: checked,
      }))
    }

  const handleUserTypeChange = (type: UserType) => {
    setFormData((prev) => ({ ...prev, userType: type }))
  }

  const isFormValid = () => {
    return (
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.password.length >= 8 &&
      formData.agreeToTerms
    )
  }

  return (
    <div className='md:h-full min-h-screen flex flex-col items-center px-6 bg-gray2'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='flex justify-center mt-6 mb-2 w-40 h-25 mx-auto'
      >
        <img src={logo} alt='materapro logo' className='object-cover w-max' />
      </motion.div>

      <div className='text-center mb-8 max-w-sm'>
        <h1 className='text-2xl font-bold mb-3'>Create account</h1>
        <p className='text-lnblack text-sm leading-relaxed'>
          Create your personal account now to access all exclusive benefits we
          have to offer.
        </p>
      </div>

      {/* Account Type Tabs */}
      <div className='w-full max-w-sm mb-6'>
        <div className='flex bg-gray rounded-xl p-1'>
          {userTypes.map(({ type, label }) => (
            <Button
              label={label}
              key={type}
              onClick={() => handleUserTypeChange(type)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                formData.userType === type
                  ? "bg-white  shadow-sm"
                  : "hover:text-black"
              }`}
              bgColor='bg-transparent'
              textColor={`${
                formData.userType === type ? "text-black" : "text-lnblack"
              }`}
            />
          ))}
        </div>
      </div>

      <div className='space-y-3 flex flex-col w-full justify-center items-center mb-2'>
        <Button
          label={
            <div className='flex gap-2 text-xs items-center'>
              <span>
                <img src={google} alt='google logo' className='w-4' />
              </span>{" "}
              Sign up with Google
            </div>
          }
          bgColor='bg-blue'
          textColor='text-black'
          className='border border-primary md:w-sm w-full'
        />
        <Button
          label={
            <div className='flex text-xs items-center'>
              <span>
                <img src={facebook} alt='facebook logo' className='w-6' />
              </span>{" "}
              Sign up with Facebook
            </div>
          }
          bgColor='bg-blue'
          textColor='text-black'
          className='border border-primary md:w-sm w-full'
        />
      </div>
      <div className='border-b-2 flex w-full -mb-4 mt-10 border-b-gray md:w-sm'></div>
      <div className='text-center bg-gray2 w-fit mb-12 p-1 mx-auto text-sm'>
        or
      </div>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-sm space-y-2 md:mb-20 overflow-y-scroll h-screen'
      >
        {error && (
          <div className='bg-red/50 border border-red text-red/60 px-4 py-3 rounded-md text-sm mb-4'>
            {error}
          </div>
        )}

        <div className='space-y-6'>
          <Input
            label='Full name'
            type='text'
            variant='default'
            placeholder='John Doe'
            value={formData.fullName}
            onChange={handleInputChange("fullName")}
            required
          />

          <Input
            label='Email address'
            type='email'
            variant='default'
            placeholder='example@gmail.com'
            value={formData.email}
            onChange={handleInputChange("email")}
            required
          />

          <div className='relative'>
            <Input
              label='Password'
              type='password'
              variant='password'
              showPasswordToggle={true}
              placeholder='8+ characters'
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className='mt-2'>
                <div className='text-xs text-gray-600 mb-1'>
                  Contains at least 8 characters
                </div>
                <div className='flex gap-1 mb-2'>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded ${
                        i < passwordStrength.score
                          ? "bg-current"
                          : "bg-gray-200"
                      }`}
                      style={{ color: passwordStrength.color }}
                    />
                  ))}
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <div className='space-y-1'>
                    {passwordStrength.feedback.map((item, index) => (
                      <p key={index} className='text-xs text-gray-600'>
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className='pt-4'>
          <Checkbox
            label='I agree to the Terms and Conditions'
            size='sm'
            checked={formData.agreeToTerms}
            onChange={handleCheckboxChange("agreeToTerms")}
          />
        </div>

        <div className='absolute bottom-6 left-6 right-6 max-w-sm mx-auto'>
          <Button
            type='submit'
            label={isLoading ? "Creating account..." : "Create account"}
            className='bg-primary w-full text-white'
            disabled={isLoading || !isFormValid()}
          />
          <p className='text-sm text-center text-lnblack mt-2'>
            Already have an account?{" "}
            <Link
              to='/client/login'
              className='text-primary underline font-bold'
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

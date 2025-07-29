import React, { useState, useEffect, ReactElement } from "react"
import { FaCamera, FaCheck, FaChevronLeft, FaPlus } from "react-icons/fa"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import Input from "@/components/shared/Input"
import {
  PiAt,
  PiCardholder,
  PiPhone,
  PiUpload,
  PiUser,
  PiWallet,
} from "react-icons/pi"
import Button from "@/components/shared/Button"

// Types
interface SetupStep {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "incomplete"
  required: boolean
  icon: ReactElement
}

interface FormData {
  // Required Information
  fullName: string
  phone: string
  email: string
  country: string
  state: string
  lga: string
  streetAddress: string

  // Profile Customization
  profilePhoto: File | null

  // Procurement Information (for some user types)
  procurementInfo: string

  // Payment Details
  cardName: string
  cardNumber: string
  cvv: string
  expirationDate: string
}

// Pagination Component
const StepPagination: React.FC<{
  steps: SetupStep[]
  currentStep: string
}> = ({ steps, currentStep }) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep)
  }

  const currentIndex = getCurrentStepIndex()

  return (
    <div className='w-full max-w-2xl mx-auto px-4 py-6'>
      <div className='hidden md:flex items-center justify-between'>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className='flex items-center gap-2 justify-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${
                  index <= currentIndex
                    ? "bg-primary text-white"
                    : "bg-gray text-lnblack"
                }`}
              >
                {step.status === "completed" ? (
                  <FaCheck className='w-2 h-2' />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-xs text-center max-w-16 ${
                  index <= currentIndex ? "text-primary" : "text-lnblack"
                }`}
              >
                {step.title.split(" ")[0]}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentIndex ? "bg-primary" : "bg-gray"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// Step Status Component
const StepStatus: React.FC<{
  status: "pending" | "in-progress" | "completed" | "incomplete"
}> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green/10",
          text: "text-green",
          label: "Completed",
          icon: <FaCheck className='w-3 h-3' />,
        }
      case "in-progress":
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          label: "In progress",
          icon: null,
        }
      case "incomplete":
        return {
          bg: "bg-red/10",
          text: "text-red",
          label: "Incomplete",
          icon: null,
        }
      default:
        return {
          bg: "bg-gray",
          text: "text-lnblack",
          label: "Pending",
          icon: null,
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[8px] font-bold ${config.bg} ${config.text}`}
    >
      {config.icon}
      {config.label}
    </div>
  )
}

// Step Item Component
const StepItem: React.FC<{
  step: SetupStep
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}> = ({ step, isExpanded, onToggle, children }) => {
  return (
    <div className='overflow-hidden'>
      <div
        className='p-4 cursor-pointer hover:bg-white rounded-xl transition-colors'
        onClick={onToggle}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div
              className={`w-10 md:w-8 h-8 rounded-full flex items-center justify-center text-xs
              ${
                step.status === "completed"
                  ? "bg-lightsecondary text-green"
                  : step.status === "in-progress"
                  ? "bg-lightsecondary text-secondary"
                  : "bg-lightsecondary text-secondary"
              }`}
            >
              <div className='text-secondary'>{step.icon}</div>
            </div>
            <div>
              <h3 className='font-bold text-sm text-black'>{step.title}</h3>
              <p className='text-xs text-lnblack'>{step.description}</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <StepStatus status={step.status} />
            <FaChevronLeft
              className={`w-6 h-6 transition-transform rounded-full p-2 ${
                isExpanded
                  ? "-rotate-90 bg-black text-white"
                  : "rotate-180 bg-gray text-lnblack"
              }`}
            />
          </div>
        </div>
      </div>
      {isExpanded && <div className='bg-gray-50 p-4'>{children}</div>}
    </div>
  )
}

// Required Information Form
const RequiredInformationForm: React.FC<{
  formData: FormData
  onChange: (data: Partial<FormData>) => void
}> = ({ formData, onChange }) => {
  const countryOptions = [
    { value: "Nigeria", label: "Nigeria" },
    { value: "Ghana", label: "Ghana" },
    { value: "Kenya", label: "Kenya" },
  ]

  const stateOptions = [
    { value: "Oyo state", label: "Oyo state" },
    { value: "Lagos state", label: "Lagos state" },
    { value: "Abuja", label: "Abuja" },
  ]

  const lgaOptions = [
    { value: "Irese Local Government", label: "Irese Local Government" },
    { value: "Ikeja Local Government", label: "Ikeja Local Government" },
  ]

  return (
    <div className='space-y-4'>
      <div className='flex gap-4 items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <PiUser className='w-4 h-4 ' fill='grey' />
          <p className='text-lnblack text-xs font-semibold'>Full Name</p>
        </div>
        <Input
          type='text'
          value={formData.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder='John Doe'
        />
      </div>
      <div className='flex gap-4 items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <PiPhone className='w-4 h-4 ' fill='grey' />
          <p className='text-lnblack text-xs font-semibold'>Phone</p>
        </div>
        <Input
          type='tel'
          value={formData.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder='+234 913 5029 688'
        />
      </div>
      <div className='flex gap-4 items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <PiAt className='w-4 h-4 ' fill='grey' />
          <p className='text-lnblack text-xs font-semibold'>Email</p>
        </div>
        <Input
          type='email'
          value={formData.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder='example@gmail.com'
        />
      </div>

      <Input
        label='Country'
        variant='select'
        value={formData.country}
        onChange={(e) => onChange({ country: e.target.value })}
        placeholder='Select country'
        options={countryOptions}
      />

      <Input
        label='State'
        variant='select'
        value={formData.state}
        onChange={(e) => onChange({ state: e.target.value })}
        placeholder='Select state'
        options={stateOptions}
      />

      <Input
        label='LGA'
        variant='select'
        value={formData.lga}
        onChange={(e) => onChange({ lga: e.target.value })}
        placeholder='Select LGA'
        options={lgaOptions}
      />
      <Input
        label='Street address'
        type='text'
        variant='default'
        value={formData.streetAddress}
        onChange={(e) => onChange({ streetAddress: e.target.value })}
        placeholder='11D, Ajao Street, Alex Road...'
      />
    </div>
  )
}

// Profile Customization Form
const ProfileCustomizationForm: React.FC<{
  formData: FormData
  onChange: (data: Partial<FormData>) => void
}> = ({ formData, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange({ profilePhoto: file })
  }

  return (
    <div className='space-y-4'>
      <div className='text-left flex items-center gap-2'>
        <div className='inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-blue border-2 border-dashed border-blue rounded-full'>
          <label className='inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:bg-primary/90 cursor-pointer transition-colors text-xs'>
            {/* <PiUpload className='w-4 h-4' /> */}
            <FaCamera className='w-5 h-5 md:w-8 md:h-8 text-primary' />

            {/* Upload Photo */}
            <input
              type='file'
              accept='.jpeg,.jpg,.png,.svg'
              onChange={handleFileChange}
              className='hidden'
            />
          </label>
        </div>
        <div className='text-lnblack'>
          <p className='text-xs font-semibold md:text-sm mb-2'>
            Add profile photo (Maximum of 6mb)
          </p>
          <p className='text-xs'>Format must be .jpeg, .jpg, .png or .svg</p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        {formData.profilePhoto && (
          <p className='text-sm text-green-600'>
            File selected: {formData.profilePhoto.name}
          </p>
        )}
      </div>
    </div>
  )
}

// Payment Details Preview (for the main page)
const PaymentDetailsPreview: React.FC<{
  onAddPayment: () => void
  hasPaymentMethod: boolean
}> = ({ onAddPayment, hasPaymentMethod }) => {
  return (
    <div className='space-y-4'>
      <p className='text-sm text-gray-600 mb-4'>
        We support all major payment options so you can enjoy non-stop access.
      </p>

      {hasPaymentMethod ? (
        <div className='p-4 bg-gray-50 rounded-lg'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-blue-600 rounded flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>VISA</span>
              </div>
              <div>
                <p className='text-sm font-medium'>Card ending in ****3422</p>
                <p className='text-xs text-gray-500'>Expires 05/31</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full'>
                Default
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center py-8 text-gray-500'>
          <p className='mb-4'>No payment method added</p>
        </div>
      )}

      <button
        onClick={onAddPayment}
        className='flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium'
      >
        <FaPlus className='w-4 h-4' />
        Add payment method
      </button>
    </div>
  )
}

// Main Account Setup Component
const AccountSetup: React.FC = () => {
  const [expandedStep, setExpandedStep] = useState<string>("1")
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    lga: "",
    streetAddress: "",
    profilePhoto: null,
    procurementInfo: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
    expirationDate: "",
  })

  // Populate form data from user info on component mount
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }

    // Check if returning from payment page
    if (location.state?.paymentAdded) {
      setHasPaymentMethod(true)
      setExpandedStep("4") // Show payment step
    }
  }, [user, location.state])

  const steps: SetupStep[] = [
    {
      id: "1",
      title: "Required information",
      description: "Provide required information",
      status: "completed",
      required: true,
      icon: <PiUser />,
    },
    {
      id: "2",
      title: "Profile customization",
      description: "Customize your account",
      status: "completed",
      required: false,
      icon: <PiUpload />,
    },
    {
      id: "3",
      title: "Procurement information",
      description: "Share more requirements",
      status: "incomplete",
      required: false,
      icon: <PiCardholder />,
    },
    {
      id: "4",
      title: "Payment details",
      description: "Add your account details",
      status: hasPaymentMethod ? "completed" : "in-progress",
      required: true,
      icon: <PiWallet />,
    },
  ]

  const handleFormDataChange = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleStepToggle = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? "" : stepId)
  }

  const handleAddPayment = () => {
    navigate("/client/account-setup/payment", { state: { formData } })
  }

  const handleCompleteSetup = async () => {
    try {
      // Here you would typically call your onboarding completion API
      // await completeOnboarding(formData)

      // For now, just navigate to dashboard
      navigate("/client/dashboard")
    } catch (error) {
      console.error("Setup completion failed:", error)
    }
  }

  const renderStepContent = (step: SetupStep) => {
    switch (step.id) {
      case "1":
        return (
          <RequiredInformationForm
            formData={formData}
            onChange={handleFormDataChange}
          />
        )
      case "2":
        return (
          <ProfileCustomizationForm
            formData={formData}
            onChange={handleFormDataChange}
          />
        )
      case "3":
        return (
          <div className='space-y-4'>
            <p className='text-sm text-lnblack'>
              Share more about your procurement requirements and preferences.
            </p>
            <textarea
              value={formData.procurementInfo}
              onChange={(e) =>
                handleFormDataChange({ procurementInfo: e.target.value })
              }
              placeholder='Tell us about your procurement needs...'
              rows={4}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent'
            />
          </div>
        )
      case "4":
        return (
          <PaymentDetailsPreview
            onAddPayment={handleAddPayment}
            hasPaymentMethod={hasPaymentMethod}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gray2'>
      {/* Header */}
      <div className='bg-gray2 px-4 py-3'>
        <div className='flex items-center justify-center gap-3'>
          <div className='text-center'>
            <h1 className='text-lg font-bold'>Account Setup</h1>
            <p className='text-sm text-lnblack'>
              Complete simple steps to get started.
            </p>
          </div>
        </div>
      </div>

      {/* Step Pagination */}
      <StepPagination steps={steps} currentStep={expandedStep} />

      {/* Content */}
      <div className='max-w-md mx-auto p-4'>
        <div className='space-y-6'>
          {steps.map((step) => (
            <StepItem
              key={step.id}
              step={step}
              isExpanded={expandedStep === step.id}
              onToggle={() => handleStepToggle(step.id)}
            >
              {renderStepContent(step)}
            </StepItem>
          ))}
        </div>

        {/* Complete Setup Button */}
        <div className='mt-8'>
          <Button
            onClick={handleCompleteSetup}
            label='Complete Setup'
            className='max-w-md w-full mx-auto'
          />
        </div>
      </div>
    </div>
  )
}

export default AccountSetup

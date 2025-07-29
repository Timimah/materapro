import Button from "@/components/shared/Button"
import Input from "@/components/shared/Input"
import React, { useState } from "react"
import { FaChevronLeft, FaCreditCard, FaLock } from "react-icons/fa"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { PiCreditCard, PiWallet } from "react-icons/pi"
import { useNavigate, useLocation } from "react-router-dom"

interface CardFormData {
  cardName: string
  cardNumber: string
  cvv: string
  expirationDate: string
}

const CardDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showCVV, setShowCVV] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Get form data from navigation state if available
  const existingFormData = location.state?.formData || {}

  const [cardData, setCardData] = useState<CardFormData>({
    cardName: existingFormData.cardName || "",
    cardNumber: existingFormData.cardNumber || "",
    cvv: existingFormData.cvv || "",
    expirationDate: existingFormData.expirationDate || "",
  })

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpirationDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2, 6)}`
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardData((prev) => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpirationDate(e.target.value)
    setCardData((prev) => ({ ...prev, expirationDate: formatted }))
  }

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
    setCardData((prev) => ({ ...prev, cvv: value }))
  }

  const isFormValid = () => {
    return (
      cardData.cardName.trim() &&
      cardData.cardNumber.replace(/\s/g, "").length >= 13 &&
      cardData.cvv.length >= 3 &&
      cardData.expirationDate.length === 7
    )
  }

  const handleSave = async () => {
    if (!isFormValid()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Navigate back to account setup with updated payment status
      navigate("/client/account-setup", {
        state: {
          paymentAdded: true,
          cardData: cardData,
        },
      })
    } catch (error) {
      console.error("Failed to save card details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "")
    if (cleanNumber.startsWith("4")) return "VISA"
    if (cleanNumber.startsWith("5") || cleanNumber.startsWith("2"))
      return "MASTERCARD"
    if (cleanNumber.startsWith("3")) return "AMEX"
    return "CARD"
  }

  const getCardColor = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "")
    if (cleanNumber.startsWith("4")) return "from-blue-600 to-blue-800"
    if (cleanNumber.startsWith("5") || cleanNumber.startsWith("2"))
      return "from-red-500 to-red-700"
    if (cleanNumber.startsWith("3")) return "from-green-500 to-green-700"
    return "from-gray-600 to-gray-800"
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white px-4 py-3'>
        <div className='flex items-center gap-3 max-w-md mx-auto'>
          <Button
            onClick={() => navigate(-1)}
            label={<FaChevronLeft className='w-3 h-3' />}
            bgColor='bg-transparent'
            textColor='text-lnblack'
          />
          <div className='flex w-full mr-8 justify-center'>
            <h1 className='font-bold'>Card details</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-md mx-auto p-6'>
        <div className='space-y-2'>
          <div>
            <div className='p-3 w-fit bg-lightsecondary rounded-full'>
              <PiWallet className='text-secondary' />
            </div>{" "}
            <h1 className='font-bold text-sm'>Card details</h1>
          </div>
          <p className='text-lnblack text-xs mb-6'>
            We support all major payment options so you can enjoy non-stop
            access.
          </p>

          <div className='space-y-6'>
            <Input
              label='Card name'
              type='text'
              variant='default'
              value={cardData.cardName}
              onChange={(e) =>
                setCardData((prev) => ({ ...prev, cardName: e.target.value }))
              }
              placeholder='John Doe'
            />

            <div className='relative'>
              <Input
                label='Card Number'
                type='text'
                variant='withIcon'
                icon={<PiCreditCard className='w-4 h-4' />}
                value={cardData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder='0000 0000 0000 0000'
                maxLength={19}
              />
              {cardData.cardNumber && (
                <div className='absolute right-4 top-9 transform'>
                  <div className='px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-700'>
                    {getCardType(cardData.cardNumber)}
                  </div>
                </div>
              )}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='relative'>
                <Input
                  label='CVV'
                  type={showCVV ? "text" : "password"}
                  variant='default'
                  value={cardData.cvv}
                  onChange={handleCVVChange}
                  placeholder='000'
                  maxLength={4}
                />
                <Button
                  type='button'
                  onClick={() => setShowCVV(!showCVV)}
                  textColor='text-lnblack'
                  bgColor='bg-transparent'
                  className='absolute right-0 top-6'
                  label={
                    <>
                      {showCVV ? (
                        <HiEyeOff className='w-4 h-4' />
                      ) : (
                        <HiEye className='w-4 h-4' />
                      )}
                    </>
                  }
                />
              </div>

              <Input
                label='Expiration date'
                type='text'
                variant='default'
                value={cardData.expirationDate}
                onChange={handleExpirationChange}
                placeholder='MM/YYYY'
                maxLength={7}
              />
            </div>
          </div>

          {/* Card Preview */}
          {cardData.cardNumber && (
            <div
              className={`mt-8 p-6 bg-gradient-to-br ${getCardColor(
                cardData.cardNumber
              )} rounded-2xl text-white shadow-lg`}
            >
              <div className='flex justify-between items-start mb-8'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-6 bg-white/20 rounded-sm'></div>
                  <div className='w-12 h-8 bg-white/30 rounded-sm flex items-center justify-center'>
                    <FaCreditCard className='text-white/70' />
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-xs opacity-75 mb-1'>EXPIRES</div>
                  <div className='text-sm font-mono'>
                    {cardData.expirationDate
                      ? cardData.expirationDate.slice(0, 5)
                      : "MM/YY"}
                  </div>
                </div>
              </div>

              <div className='text-xl tracking-widest mb-6 font-mono'>
                {cardData.cardNumber || "•••• •••• •••• ••••"}
              </div>

              <div className='flex justify-between items-end'>
                <div>
                  <div className='text-xs opacity-75 mb-1'>CARDHOLDER NAME</div>
                  <div className='text-sm font-medium uppercase'>
                    {cardData.cardName || "YOUR NAME"}
                  </div>
                </div>
                <div className='text-lg font-bold'>
                  {getCardType(cardData.cardNumber)}
                </div>
              </div>
            </div>
          )}

          {/* Security Note */}
          <div className='mt-6 p-4 bg-blue rounded-lg flex items-start gap-3'>
            <FaLock className='w-4 h-4 text-primary mt-1 flex-shrink-0' />
            <div className=' text-primary'>
              <p className='text-sm font-semibold mb-1'>Secure Payment</p>
              <p className='text-xs text-blue-600'>
                Your payment information is encrypted and secure. We use
                industry-standard security measures.
              </p>
            </div>
          </div>

          {/* Save Button */}
          <Button
            label={isLoading ? "Saving..." : "Save"}
            disabled={!isFormValid() || isLoading}
            onClick={handleSave}
            className={`w-full mt-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
              isFormValid() && !isLoading
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default CardDetailsPage

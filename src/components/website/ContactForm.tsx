import React, { useState } from "react"
import Input from "../shared/Input"
import Button from "../shared/Button"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
      <div className='flex flex-col w-full md:flex-row justify-between gap-4 md:gap-10'>
        <div className='w-full'>
          <Input
            label='First name'
            name='firstname'
            placeholder='John'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='w-full'>
          <Input
            label='Last name'
            name='lastname'
            placeholder='Doe'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-1/2 flex'
          />
        </div>
      </div>
      <div className='flex flex-col w-full md:flex-row justify-between gap-4 md:gap-10'>
        <div className='w-full'>
          <Input
            label='Email'
            name='email'
            type='email'
            placeholder='example@gmail.com'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='w-full'>
          <Input
            label='Phone with Country Code'
            name='phoneWithCountry'
            type='tel'
            variant='phoneWithCountry'
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='space-y-1'>
        <label className='block text-sm font-semibold text-black'>
          Message
        </label>
        <textarea
          name='message'
          className='w-full rounded-md border p-2 h-24 text-sm transition-colors border-grey hover:border-primary/80 focus:ring focus:ring-primary'
          placeholder='How can we help'
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className='md:w-full flex justify-center py-10'>
        <Button
          label='Send Message'
          className='bg-primary w-full md:w-1/2'
          hasBg
        />
      </div>
    </form>
  )
}

export default ContactForm

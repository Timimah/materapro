import React, { useState } from "react"
import Input from "../shared/Input"
import Button from "../shared/Button"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.message
    ) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    try {
      // Replace this with your actual form submission logic
      // Example options:
      // 1. Send to your backend API
      // 2. Use a service like Formspree, Netlify Forms, or EmailJS
      // 3. Send via email using a service

      // Example with fetch to your backend:
      /*
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error('Failed to send message');
      }
      */

      // For now, just log the data (replace with actual submission logic)
      console.log("Form submitted:", formData)
      alert(
        "Message sent successfully! (This is a demo - implement actual submission)"
      )

      // Reset form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='flex gap-4'>
        <Input
          label='First name'
          name='firstname'
          placeholder='John'
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <Input
          label='Last name'
          name='lastname'
          placeholder='Doe'
          value={formData.lastname}
          onChange={handleChange}
          required
          className='w-1/2 flex'
        />
      </div>

      <div className='flex gap-4'>
        <Input
          label='Email'
          name='email'
          type='email'
          placeholder='example@gmail.com'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label='Phone with Country Code'
          name='phone'
          type='tel'
          variant='phoneWithCountry'
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor='message' className='block text-sm font-medium mb-2'>
          Message
        </label>
        <textarea
          id='message'
          name='message'
          rows={4}
          placeholder='Your message here...'
          value={formData.message}
          onChange={handleChange}
          required
          className='w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div className='md:w-full flex justify-center py-10'>
        <Button
          label={isSubmitting ? "Sending..." : "Send Message"}
          className='bg-primary w-full md:w-1/2 text-white'
          hasBg
          // disabled={isSubmitting}
        />
      </div>
    </form>
  )
}

export default ContactForm

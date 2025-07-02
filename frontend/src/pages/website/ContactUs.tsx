import { motion, useInView } from "framer-motion"
import FAQSection from "@/components/website/FAQSection"
import { useRef } from "react"
import { contactDetails } from "@/components/website/data"
import ContactForm from "@/components/website/ContactForm"

const ContactUs = () => {
  const faqRef = useRef(null)

  const viewConfig = { amount: 0.3, once: true }

  const isFaqInView = useInView(faqRef, viewConfig)
  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 2,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className='mx-aut0 text-lnblack'>
      <section className='bg-blue relative w-full flex flex-col md:h-[55em] py-40 -z-10'>
        <div className='w-full text-center flex flex-col gap-5 items-center py-20'>
          <p className='text-2xl md:text-5xl text-black font-extrabold'>
            Get in Touch
          </p>
          <p className='md:w-[55em] text-sm md:text-lg px-8 md:px-0'>
            Have an idea or project you'd like to discuss? Our team is eager to
            collaborate and bring your vision to life.
          </p>
        </div>
        <div className='bg-white flex flex-col gap-8 rounded-2xl py-5 mx-8 md:mx-18 px-5 shadow-sm'>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {contactDetails.map((contact, index) => (
              <motion.div
                key={index}
                className='flex flex-col gap-2 text-left gradient p-5 rounded-lg hover:shadow-lg hover:border hover:border-grey/50'
                initial='hidden'
                whileInView='show'
                viewport={{ once: false }}
                variants={cardAnimation}
                whileHover='hover'
              >
                <div className='rounded-full bg-white w-15 h-15 flex justify-center items-center'>
                  {contact.icon}
                </div>
                <h3 className='font-bold text-black mb-2'>{contact.title}</h3>
                <p className='text-gray-600'>{contact.description}</p>
                <p className='pt-5     text-primary font-bold underline'>
                  {contact.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className='bg-white flex flex-col justify-center items-center border border-gray p-1 rounded-2xl mx-8 md:mx-50 shadow-md -mt-15 pt-20'>
          <div className='flex flex-col gap-3 text-center'>
            <p className='text-black font-extrabold text-2xl md:text-3xl'>
              Message Us
            </p>
            <p>We'll get back to you within 24 Hours</p>
          </div>
          <div className='flex w-full px-8 md:px-25 pt-10'>
            <ContactForm />
          </div>
        </div>
      </section>
      <motion.div ref={faqRef} className='py-10'>
        <FAQSection inView={isFaqInView} />
      </motion.div>
    </section>
  )
}

export default ContactUs

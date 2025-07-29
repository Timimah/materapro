import React from "react"
import { motion } from "framer-motion"

const PrivacyPolicy = () => {
  return (
    <div className='relative mx-auto text-lnblack flex flex-col'>
      {/* Hero Section */}
      <section className='gradient relative w-full flex flex-col h-[20em] md:h-[30em] gap-10 md:gap-20'>
        <div className='w-full text-center flex flex-col gap-5 items-center h-[25em] mt-30 md:mt-60'>
          {/* <p className='text-xs md:text-sm text-white font-bold p-2 bg-secondary rounded-lg w-fit'>
            FAQS
          </p> */}
          <p className='text-2xl md:text-5xl text-black font-extrabold'>
            Our Privacy Policy
          </p>
          <p className='md:w-[55em] text-sm md:text-lg px-8 md:px-0'>
            Understand how we collect, use, and protect your data on MateraPro's
            digital platform for construction material procurement and
            connecting with excellent workers.
          </p>
        </div>
      </section>

      {/* Pivacy Policy Section */}
      <motion.section
        initial='initial'
        animate='animate'
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        className='mx-8 md:mx-18 flex flex-col justify-center gap-6 pt-5'
      >
        <p>
          <ol>
            <li>
              <span className='font-bold'>1. Data We Collect</span> We collect
              your name, email, phone number, business information, and usage
              data when you register or interact with our platform.
            </li>
          </ol>{" "}
          <br /> <br /> 2. How We Use Your Data Your data is used to: Create and
          manage your account Process transactions Improve our services
          Communicate important updates
          <br /> <br /> 3. Data Sharing We never sell your data. We may share it
          with trusted third-party partners (e.g. payment processors) strictly
          for service delivery. <br /> <br /> 4. Data Security We implement
          strong encryption and secure servers to protect your data from
          unauthorized access. <br /> <br /> 5. Cookies We use cookies to
          personalize your experience and analyze website traffic. You can
          manage cookie preferences in your browser settings. <br /> <br /> 6.
          Your Rights You can request access, correction, or deletion of your
          data at any time by contacting us at privacy@materapro.com. <br />{" "}
          <br /> 7. Updates We may update this policy occasionally. Users will
          be notified of significant changes via email or platform notice.
        </p>
      </motion.section>
    </div>
  )
}

export default PrivacyPolicy

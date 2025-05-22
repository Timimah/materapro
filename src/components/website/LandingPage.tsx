import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Why1 from "@assets/home1.webp"
import Why2 from "@assets/home2.webp"
import Apart1 from "@assets/home3.webp"
import Apart2 from "@assets/home4.webp"
import FAQSection from "./FAQSection"
import { animations, companyInfo, services } from "./data"
import { getHoverAnimation, getViewConfig } from "@/utils/animations"

const LandingPage = () => {
  const heroRef = useRef(null)
  const apartRef = useRef(null)
  const faqRef = useRef(null)
  const viewConfig = getViewConfig()

  const { cardAnimation, fadeInUp } = animations

  const isHeroInView = useInView(heroRef, viewConfig)
  const isApartInView = useInView(apartRef, viewConfig)
  const isFaqInView = useInView(faqRef, viewConfig)

  return (
    <div className='mx-auto text-lnblack'>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial='initial'
        animate={isHeroInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        <div className='flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20 h-screen md:py-100 py-20'>
          <div className='h-full flex flex-col justify-center md:justify-start flex-1/3 px-8 md:px-0 md:-ml-20'>
            <img
              src={Why1}
              alt=''
              className='rounded-2xl w-full h-80 object-cover shadow-lg'
            />
          </div>
          <div className='flex flex-col gap-4 md:gap-6 justify-center flex-1/3 text-center'>
            <h1 className='text-2xl md:text-3xl text-black font-extrabold mb-4'>
              Why Choose Us
            </h1>
            <p className='px-8 md:px-0'>{companyInfo.whyChooseUs}</p>
          </div>
          <div className='md:h-full flex flex-col justify-end items-end flex-1/3 px-8 md:px-0 md:-mr-10'>
            <img
              src={Why2}
              alt=''
              className='rounded-2xl md:-ml-20 w-90 h-80 object-cover shadow-lg'
            />
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className='gradient flex flex-col gap-8 rounded-2xl py-5 mx-8 md:mx-18 px-5 shadow-sm'>
        <div className='md:pt-5 md:items-center flex md:flex-row flex-col gap-4 md:gap-60 justify-between'>
          <h2 className='text-2xl md:text-3xl font-extrabold text-black md:w-1/2'>
            What We Offer
          </h2>
          <p className='w-full'>{companyInfo.whatWeOffer}</p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className='flex flex-col gap-2 text-left bg-white p-5 rounded-lg hover:shadow-lg hover:bg-blue hover:border hover:border-grey/50'
              initial='hidden'
              whileInView='show'
              viewport={{ once: false }}
              variants={cardAnimation}
              whileHover={getHoverAnimation()}
            >
              <div className='rounded-full hover:bg-white gradient w-15 h-15 flex justify-center items-center'>
                {service.icon}
              </div>
              <h3 className='font-bold text-black mb-2'>{service.title}</h3>
              <p className='text-gray-600'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What Sets Us Apart */}
      <motion.section
        ref={apartRef}
        className='flex flex-col my-20 md:my-30 gap-8 justify-center items-center text-center'
        initial='initial'
        animate={isApartInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        <h2 className='text-2xl md:text-3xl font-extrabold text-black'>
          What Sets Us Apart
        </h2>
        <p className='px-8 md:px-0 md:w-[50em]'>
          {companyInfo.whatSetsUsApart}
        </p>
        <div className='h-60 flex items-center md:my-20'>
          <div className='-rotate-12 flex items-center justify-center w-32 h-32 md:w-52 md:h-52 bg-white rounded-2xl border border-gray shadow-md z-10'>
            <img
              src={Apart1}
              alt=''
              className='w-30 h-30 md:w-50 md:h-50 object-cover rounded-xl shadow-lg'
            />
          </div>
          <div className='rotate-12 flex items-center justify-center w-32 h-32 md:w-52 md:h-52 bg-white rounded-2xl border border-gray md z-10'>
            <img
              src={Apart2}
              alt=''
              className='w-30 h-30 md:w-50 md:h-50 object-cover rounded-xl shadow-lg'
            />
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.div ref={faqRef}>
        <FAQSection inView={isFaqInView} />
      </motion.div>
    </div>
  )
}

export default LandingPage

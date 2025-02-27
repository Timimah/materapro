import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Why1 from "@assets/home1.jpeg"
import Why2 from "@assets/home2.jpeg"
import Apart1 from "@assets/home3.jpeg"
import Apart2 from "@assets/home4.jpeg"
import Support from "@assets/amico.png"

const LandingPage = () => {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const apartRef = useRef(null)
  const faqRef = useRef(null)

  // Updated useInView options:
  // amount: 0.3 means element needs to be 30% visible
  // once: false allows re-triggering when scrolling up/down
  const viewConfig = { amount: 0.3, once: false }

  const isHeroInView = useInView(heroRef, viewConfig)
  // Separate config for services section that requires full visibility
  const servicesInView = useInView(servicesRef, { amount: 1, once: false })

  // Container animation for services grid
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.3, // Delay before starting children animations
      },
    },
  }

  // Individual service card animation
  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  }

  const isApartInView = useInView(apartRef, viewConfig)
  const isFaqInView = useInView(faqRef, viewConfig)

  const fadeInUp = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, delay: 2, ease: [0, 0.71, 0.2, 1.01] },
  }

  const services = [
    {
      title: "Supply Procurement",
      description: "Access quality materials from trusted suppliers",
      icon: "📦",
    },
    {
      title: "Worker Showroom",
      description: "Find skilled workers for your projects",
      icon: "👷",
    },
    {
      title: "Efficient Collaboration",
      description: "Connect with clients and workers seamlessly",
      icon: "🤝",
    },
    {
      title: "Transparency & Quality",
      description: "Ensure project success with our vetted workers",
      icon: "✅",
    },
  ]

  const faqs = [
    {
      question: "What is our platform and what services do we render?",
      answer:
        "We are a digital platform providing procurement of construction materials and a showroom for excellent workers, empowering the construction industry through seamless collaboration and efficient processes.",
    },
    {
      question: "How do I register as a client or worker?",
      answer: "Registration process information would go here.",
    },
    {
      question:
        "What are the benefits of using our platform for construction material procurement?",
      answer: "Benefits information would go here.",
    },
    {
      question: "Can I trust the workers listed on our showroom?",
      answer: "Worker verification information would go here.",
    },
  ]

  return (
    <div className='mx-auto px-4 text-lnblack'>
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial='initial'
        animate={isHeroInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        <div className='flex justify-between gap-8 h-screen py-100'>
          <div className='rounded-lg flex flex-col justify-start flex-1/3'>
            <img
              src={Why1}
              alt=''
              className='w-80 h-80 object-cover rounded-r-xl shadow-lg'
            />
          </div>
          <div className='flex flex-col gap-6 justify-center flex-1/3 text-center'>
            <h1 className='text-3xl text-black font-extrabold mb-4'>
              Why Choose Us
            </h1>
            <p className='text-gray-600'>
              At MateraPro, we offer a showroom for skilled workers with
              excellent work ethics and proven records of exceptional quality
              for construction clients to enjoy. Hence, we are basically solving
              the issues involved in construction projects that leads to
              elongations of completion period and unachievable increase in cost
              of construction project.
            </p>
          </div>
          <div className='rounded-lg flex flex-col justify-end items-end flex-1/3'>
            <img
              src={Why2}
              alt=''
              className='w-80 h-80 object-cover rounded-l-lg shadow-lg'
            />
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        className='gradient flex flex-col gap-8 rounded-2xl pt-40 pb-20 mx-60 px-20 shadow-sm'
        initial='hidden'
        animate={servicesInView ? "show" : "hidden"}
        variants={containerAnimation}
      >
        <div className='flex gap-30 items-center'>
          <h2 className='text-3xl font-extrabold text-black mb-8 w-1/2'>
            What We Offer
          </h2>
          <p className='flex justify-end w-full'>
            We offer innovative solutions that promote excellent work ethics in
            the construction industry while driving efficiency.
          </p>
        </div>
        <motion.div
          className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'
          variants={containerAnimation}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className='flex flex-col gap-2 text-left bg-white p-14 rounded-lg hover:shadow-lg hover:bg-blue hover:border hover:border-grey/50'
              variants={cardAnimation}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className='rounded-full hover:bg-white gradient w-15 h-15 flex justify-center items-center'>
                {service.icon}
              </div>
              <h3 className='font-bold text-black mb-2'>{service.title}</h3>
              <p className='text-gray-600'>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* What Sets Us Apart */}
      <motion.section
        ref={apartRef}
        className='flex flex-col my-60 gap-8 justify-center items-center text-center'
        initial='initial'
        animate={isApartInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        <h2 className='text-3xl font-extrabold text-black'>
          What Sets Us Apart
        </h2>
        <p className='w-[50em]'>
          At MateraPro, we're dedicated to revolutionizing the construction
          industry through innovative technology, unparalleled expertise, and
          uncompromising quality assurance. Our team of seasoned professionals
          leverages cutting-edge tools to streamline processes, ensure precision
          craftsmanship, and maximize cost-effectiveness. With a relentless
          focus on excellence and customer satisfaction, we've established
          ourselves as the trusted partner for discerning clients seeking
          exceptional construction experiences.
        </p>
        <div className='h-60 flex items-center my-20'>
          <div className='-rotate-12 flex items-center justify-center w-52 h-52 bg-white rounded-2xl border border-gray shadow-md z-10'>
            <img
              src={Apart1}
              alt=''
              className='w-50 h-50 object-cover rounded-xl shadow-lg'
            />
          </div>
          <div className='rotate-12 flex items-center justify-center w-52 h-52 bg-white rounded-2xl border border-gray md z-10'>
            <img
              src={Apart2}
              alt=''
              className='w-50 h-50 object-cover rounded-xl shadow-lg'
            />
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        ref={faqRef}
        initial='initial'
        animate={isFaqInView ? "animate" : "initial"}
        variants={fadeInUp}
        className='mx-60 flex flex-col gap-6 h-screen'
      >
        <div className='flex flex-col gap-2'>
          <p className='text-3xl font-extrabold text-black mb-8'>
            We have 24/7 Support Available
          </p>
          <p className='text-sm'>Get answers to your questions.</p>
        </div>
        <div className='flex justify-between items-center'>
          <div className='w-1/2'>
            <img src={Support} alt='Support image' className='object-cover' />
          </div>
          <div className='space-y-4 w-1/2'>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className=''
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: index * 0.1 }}
              >
                <h3 className='text-xl text-black font-bold py-8'>
                  {faq.question}
                </h3>
                <p className='text-sm'>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default LandingPage

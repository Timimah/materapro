// export default Footer
import React from "react"
import { motion } from "framer-motion"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"
import Footerimg from "@assets/home5.jpeg"
import logo from "@assets/logo.png"

const Footer = () => {
  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ]

  const footerLinks = [
    {
      title: "About us",
      links: [
        { text: "Mission Statement", href: "#" },
        { text: "Values", href: "#" },
      ],
    },
    {
      title: "Contact us",
      links: [
        { text: "matera@gmail.com", href: "mailto:matera@gmail.com" },
        { text: "+234 913 5029 688", href: "tel:+2349135029688" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { text: "FAQS", href: "#" },
        { text: "Privacy Policy", href: "#" },
      ],
    },
  ]

  return (
    <footer className='relative mt-60 md:mt-50'>
      <div className='bg-blue md:px-18 w-full flex justify-between flex-col'>
        <div className='flex relative bg-white border border-gray p-1 rounded-2xl h-[20em] md:h-[30em] mx-8 md:mx-18 -mt-30 md:-mt-50'>
          <img
            src={Footerimg}
            alt='Footer image'
            className='relative rounded-xl object-cover h-full w-full'
          />
          <div className='bg-black/30 absolute inset-0 text-white text-center text-2xl md:text-4xl flex items-center justify-center rounded-xl font-extrabold px-10 md:px-80'>
            Transforming the Construction Industry with Digital Innovation.
          </div>
        </div>
        <div className='flex justify-center md:py-17 w-full'>
          {/* Logo Section */}
          <div className='flex flex-col md:flex-row md:gap-20 items-center text-xs'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={logo}
                alt='MateraPro Logo'
                className='w-40 h-30 md:w-60 md:h-40 object-cover'
              />
            </motion.div>

            {/* Links Sections */}
            <div className='flex gap-6 md:gap-30 pb-10 mb:py-0 w-full'>
              {footerLinks.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='flex flex-col gap-4 md:gap-5'
                >
                  <p className='font-bold'>{section.title}</p>
                  <ul className='flex flex-col gap-3 md:gap-3'>
                    {section.links.map((link) => (
                      <li key={link.text}>
                        <a
                          href={link.href}
                          className='hover:text-primary transition-colors'
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='flex flex-col justify-between gap-4 text-xs pb-10 md:pb-0'
            >
              <p className='font-bold'>© 2024 MateraPro. All rigts reserved.</p>

              {/* Social Links */}
              <div className='flex  gap-4'>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-8 h-8 flex items-center justify-center rounded-full bg-white text-primary hover:text-secondary transition-colors'
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
      </div>
    </footer>
  )
}

export default Footer

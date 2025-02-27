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
    <footer className='relative h-screen flex items-end'>
      <div className='bg-blue mx-auto h-[30em] px-60 w-full flex flex-col'>
        <div className='flex bg-white border border-gray p-4 rounded-2xl h-[30em] left-0 right-0 absolute mx-60 bottom-50'>
          <img
            src={Footerimg}
            alt='Footer image'
            className='rounded-xl object-cover h-full w-full'
          />
          <div className='bg-black/30 absolute inset-0 text-white text-center text-4xl flex items-center justify-center rounded-xl font-extrabold px-80'>
            Transforming the Construction Industry with Digital Innovation.
          </div>
        </div>
        <div className='items-end flex h-full'>
          {/* Logo Section */}
          <div className='flex items-center w-full gap-20 text-xs'>
            <div className='flex flex-col items-end'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={logo}
                  alt='MateraPro Logo'
                  className='w-60 h-60 object-cover'
                />
              </motion.div>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='flex flex-col gap-5'
              >
                <p className='font-bold'>{section.title}</p>
                <ul className='flex flex-col gap-3'>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='flex flex-col justify-between gap-4 text-xs'
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

import React from "react"
import { motion } from "framer-motion"
// import { FiBookmark } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import logo from "@assets/shared/logo.png"
import Button from "@/components/shared/Button"

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen flex justify-center p-2 bg-gray2'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-md'
      >
        {/* Content */}
        <div className='px-6 py-8'>
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='flex justify-center mb-2 w-40 h-25 mx-auto'
          >
            <img
              src={logo}
              alt='materapro logo'
              className='object-cover w-max'
            />
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='text-center mb-8'
          >
            <h1 className='text-2xl font-bold mb-3'>Welcome to MateraPro!</h1>
            <p className='text-lnblack text-xs leading-relaxed'>
              Don't miss the opportunity to let MateraPro be your construction
              solutions partner.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='space-y-4'
          >
            <Button
              label='Create Account'
              className='border border-secondary  w-full'
              bgColor='bg-lightsecondary'
              textColor='text-black'
              onClick={() => navigate("/register")}
            />
            <div className='border-b-2 flex w-full -mb-4 mt-10 border-b-gray'></div>
            <div className='text-center bg-gray2 w-fit mb-10 p-1 mx-auto text-sm'>
              or
            </div>
            <Button
              label='Log in to my Account'
              className='w-full'
              onClick={() => navigate("/client/login")}
            />
          </motion.div>

          {/* Terms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className='absolute bottom-6 left-6 right-6 mt-8 text-center text-xs text-lnblack leading-relaxed'
          >
            Creating an account means you're okay with our{" "}
            <Link to='#' className='underline text-primary font-bold'>
              Terms of Service
            </Link>
            and our{" "}
            <Link to='#' className='underline text-primary font-bold'>
              Privacy policy
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
export default WelcomePage

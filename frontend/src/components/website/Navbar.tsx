import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import WhiteLogo from "@assets/logo-white.svg"
import logo from "@assets/logo.png"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { motion } from "framer-motion"
import Button from "../shared/Button"

const Navbar: React.FC = () => {
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const getLinkStyle = (path: string) => {
    const isActive = location.pathname === path
    return `hover:font-bold transition-colors py-4 text-center ${
      isActive ? "font-bold text-primary" : "text-lnblack"
    }`
  }

  return (
    <nav
      className={`h-15 md:h-30 rounded-2xl fixed top-5 md:right-18 right-8 left-8 md:left-18 z-50 flex justify-between md:justify-around items-center bg-gray/20 backdrop-blur-lg backdrop-gray border-1 ${
        isHomePage ? "border-white" : "border-gray"
      }`}
    >
      <Link to='/' className='md:-ml-10'>
        {isHomePage ? (
          <img
            src={WhiteLogo}
            alt='MateraPro Logo'
            className='h-25 md:h-fit md:w-fit w-25'
          />
        ) : (
          <img
            src={logo}
            alt='MateraPro Logo'
            className='w-25 h-25 md:w-35 md:h-35 object-cover'
          />
        )}
      </Link>
      {/* Navigation Links */}
      <div className='hidden md:flex items-center w-1/2 justify-center'>
        <Link to='/' className={`${getLinkStyle("/")} w-1/6`}>
          Home
        </Link>
        <Link to='/about' className={`${getLinkStyle("/about")} w-1/6`}>
          About us
        </Link>
        <Link to='/contact' className={`${getLinkStyle("/contact")} w-1/4`}>
          Contact us
        </Link>
      </div>
      <div className='hidden md:flex w-fit'>
        <Button label='Download app' className='bg-primary' hasBg />
      </div>
      {/* Mobile menu button */}
      <div
        className={`md:hidden mr-6 cursor-pointer ${
          isHomePage ? "text-white" : "text-primary"
        }`}
        onClick={toggleMenu}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu size={20} />
          )}
        </motion.div>
      </div>
      {/* Mobile menu */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className={`fixed top-20 left-0 w-full bg-white shadow-lg rounded-b-2xl flex flex-col items-center py-5 space-y-4 transition-transform ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link to='/' className={getLinkStyle("/")} onClick={toggleMenu}>
          Home
        </Link>
        <Link
          to='/about'
          className={getLinkStyle("/about")}
          onClick={toggleMenu}
        >
          About us
        </Link>
        <Link
          to='/contact'
          className={getLinkStyle("/contact")}
          onClick={toggleMenu}
        >
          Contact us
        </Link>
        <Button label='Download app' className='bg-primary w-3/4' hasBg />
      </motion.div>
    </nav>
  )
}

export default Navbar

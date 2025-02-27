import React from "react"
import { Link } from "react-router-dom"
import WhiteLogo from "@assets/logo-white.svg"

const Navbar: React.FC = () => {
  return (
    <nav className='h-30 text-white rounded-2xl fixed top-5 right-18 left-18 z-50 flex justify-around items-center backdrop-blur-md backdrop-greyscale border-1 border-white '>
      <Link to='/' className='flex items-center'>
        <img src={WhiteLogo} alt='MateraPro Logo' className='' />
      </Link>
      {/* Navigation Links */}
      <div className='flex items-center w-1/2 justify-center'>
        <Link
          to='/'
          className='hover:font-bold active:font-bold  transition-colors py-4 w-1/6 text-center'
        >
          Home
        </Link>
        <Link
          to='/about'
          className='hover:font-bold active:font-bold transition-colors py-4 w-1/6 text-center'
        >
          About us
        </Link>
        <Link
          to='/contact'
          className='hover:font-bold active:font-bold  transition-colors py-4 w-1/4 text-center'
        >
          Contact us
        </Link>
      </div>
      <div>
        <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
          Download app
        </button>
      </div>
    </nav>
  )
}

export default Navbar

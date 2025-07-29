import { useNavigate } from "react-router-dom"

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className='h-screen flex flex-col items-center justify-center text-center px-6'>
      <h1 className='text-2xl font-bold mb-4'>Welcome to MateraPro!</h1>
      <p className='text-gray-500 mb-6'>
        Your solution for transparent and quality construction services.
      </p>
      <div className='space-y-4 w-full max-w-sm'>
        <button
          onClick={() => navigate("/login")}
          className='bg-blue-600 w-full text-white py-2 rounded-md'
        >
          Log in to your account
        </button>
        <button
          onClick={() => navigate("/signup")}
          className='border border-blue-600 w-full text-blue-600 py-2 rounded-md'
        >
          Create account
        </button>
      </div>
    </div>
  )
}

import React, { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Hero from "@assets/hero.webp"
import slide1 from "@assets/slide1.webp"
import slide2 from "@assets/slide2.webp"
import slide3 from "@assets/slide3.webp"
import slide4 from "@assets/slide4.webp"
import LandingPage from "@/components/website/LandingPage"

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "01",
      description: slide1,
    },
    {
      title: "02",
      description: slide2,
    },
    {
      title: "03",
      description: slide3,
    },
    {
      title: "04",
      description: slide4,
    },
    // Add more slides as needed
  ]

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative h-screen'>
        <div className={`absolute inset-0`}>
          <div className='container mx-auto px-4 h-full flex items-center'>
            <div className='max-w-2xl space-y-6 text-white'>
              <img
                src={Hero}
                alt='Hero image'
                className='absolute inset-0 rotate-y-180 h-full object-cover w-full'
              />
              <div className='absolute inset-0 bg-black/60 flex items-end'>
                <div className='w-1/2 text-left flex flex-col gap-5 justify-center pb-80 px-70 h-100'>
                  <p className='text-md font-medium p-8 backdrop-blur-sm backdrop-grayscale bg-grey/20 border border-white rounded-lg w-fit'>
                    Innovation, Transparency, Excellent and Growth
                  </p>
                  <p className='text-5xl font-bold'>Build Easy, Save Easy</p>
                  <p className='text-md opacity-90'>
                    Elevate your vision to new heights while you discover the
                    apex of construction perfection, and precision craftsmanship
                    converges with effortless simplicity.
                  </p>
                </div>
                <div className='w-1/2 pb-80 h-100'>
                  <div className='flex gap-5 w-full overflow-hidden'>
                    <div className='h-80 w-65'>
                      <img
                        className='object-cover h-full w-full border-4 border-white rounded-lg'
                        src={slide1}
                        alt={slide1}
                      />
                    </div>
                    <div className='h-80 w-65'>
                      <img
                        className='object-cover h-full w-full border-4 border-white rounded-lg'
                        src={slide2}
                        alt={slide2}
                      />
                    </div>
                    <div className='h-80 w-65'>
                      <img
                        className='object-cover h-full w-full border-4 border-white rounded-lg'
                        src={slide3}
                        alt={slide3}
                      />
                    </div>
                    <div className='h-80 w-65'>
                      <img
                        className='object-cover h-full w-full border-4 border-white rounded-lg'
                        src={slide4}
                        alt={slide4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4'>
          <button
            className='p-2 text-white hover:bg-white/10 rounded-full transition'
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? slides.length - 1 : prev - 1
              )
            }
          >
            <FaChevronLeft className='w-6 h-6' />
          </button>
          <div className='flex gap-2'>
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 w-16 rounded ${
                  idx === currentSlide ? "bg-blue-600" : "bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            className='p-2 text-white hover:bg-white/10 rounded-full transition'
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
              )
            }
          >
            <FaChevronRight className='w-6 h-6' />
          </button>
          <h1 className='text-6xl font-bold leading-tight'>
            {slides[currentSlide].title}
          </h1>
        </div>
      </section>

      <LandingPage />
    </div>
  )
}

export default Home

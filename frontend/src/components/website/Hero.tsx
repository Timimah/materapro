import React from "react"

import Heroimg from "@assets/hero.jpg"

const Hero = () => {
  return (
    <section className='relative h-[30em] md:h-screen'>
      <div className={`absolute inset-0`}>
        <div className='container mx-auto px-4 h-full flex items-center'>
          <div className='max-w-2xl text-white'>
            <img
              src={Heroimg}
              alt='Hero image'
              className='absolute inset-0 rotate-y-180 h-full object-cover w-full'
            />
            <div className='absolute inset-0 bg-black/60 flex items-center'>
              <div className='w-full h-ful text-center flex flex-col gap-5 justify-center items-center pt-20 md:px-18'>
                <p className='text-xs md:text-sm font-medium w-fit p-2 backdrop-blur-sm backdrop-grayscale bg-grey/20 border border-white rounded-lg'>
                  Innovation, Transparency, Excellent and Growth
                </p>
                <p className='text-2xl md:text-5xl font-extrabold'>
                  Build Easy, Save Easy
                </p>
                <p className='text-sm md:text-lg opacity-90 w-3/4'>
                  Elevate your vision to new heights while you discover the apex
                  of construction perfection, and precision craftsmanship
                  converges with effortless simplicity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
    </section>
  )
}

export default Hero

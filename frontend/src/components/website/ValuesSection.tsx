import { useState } from "react"
import { motion } from "framer-motion"
import value from "@assets/about3.jpeg"

const values = [
  {
    id: "01",
    title: "Innovation",
    description:
      "At MateraPro, innovation is at the heart of everything we do. We believe that embracing cutting-edge technologies and methodologies is key to delivering exceptional results in the construction industry. Our team is encouraged to think creatively, challenge conventional wisdom, and esplore new solutions to complex problems.",
  },
  {
    id: "02",
    title: "Transparency",
    description:
      "Transparency is the foundation of trust and credibility at MateraPro. We prioritize open and honest communication with our clients, stakeholders, and partners, ensuring that everyone is informed and aligned throughout the construction process. From accurate project timelines and budgeting to open sourcing of materials and suppliers, we believe that transparency fosters collaboration, builds trust, and ensures successful project outcomes.",
  },
  {
    id: "03",
    title: "Excellence",
    description:
      "Excellence is our benchmark at Matera. We strive to deliver high-quality construction projects that exceed our clients' expectations. To achieve this, we employ skilled and experienced professionals, utilize top-grade materials and equipment, and maintain exceptional safety standards. Our commitment to excellence is unwavering, driving us to continually improve our processes, refine our craft, and push the boundaries of what's possible in the construction industry.",
  },
  {
    id: "04",
    title: "Growth",
    description:
      "At Matera, growth is a core value that fuels our progress and innovation. We're dedicated to continuous learning, professional development, and strategic expansion. By investing in emerging technologies, trends, and talent, we stay adaptable and responsive to the evolving needs of our clients and the industry. Through strategic partnerships and collaborations, we're able to leverage expertise, share knowledge, and drive growth – ultimately elevating the construction industry as a whole.",
  },
]

export default function ValuesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className='relative bg-blue mb-20 md:my-0 md:mt-0 pt-20 pb-10 md:h-[40em]'>
      <div className='mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:px-18 px-8'>
        {/* Text Content */}
        <div
          key={values[activeIndex].id} // Ensures animation on change
          className='w-full md:w-1/2 text-left flex flex-col md:gap-15'
        >
          <h2 className='text-xl md:text-3xl font-extrabold text-primary'>
            Our Values
          </h2>

          <div className='flex flex-col'>
            {/* Tab Navigation */}
            <div className='flex justify-start gap-6 my-4 pb-5'>
              {values.map((value, index) => (
                <div className='flex flex-col gap-2'>
                  <span
                    key={value.id}
                    className={`cursor-pointer ${
                      activeIndex === index
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {value.id}
                  </span>
                  <span
                    className={`w-15 border-b-2 ${
                      activeIndex === index
                        ? "border-b-3 border-primary font-semibold"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col gap-4 md:h-[15em]'
            >
              {/* Content */}
              <h3 className='text-sm font-bold text-black'>
                {values[activeIndex].title}
              </h3>
              <p className='text-sm mt-2'>{values[activeIndex].description}</p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex justify-center md:w-102-mt-30 md:-mt-60 border border-gray bg-white shadow-sm p-1 rounded-xl'
        >
          <img
            src={value}
            alt={values[activeIndex].title}
            className='rounded-lg shadow-lg object-cover w-102 h-120'
          />
        </motion.div>
      </div>
    </section>
  )
}

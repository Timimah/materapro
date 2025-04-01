import AnimatedCard from "@/components/website/AnimatedCard"
import ValuesSection from "@/components/website/ValuesSection"
import aboutHero from "@assets/about1.jpeg"
import about from "@assets/about2.jpeg"
import vision from "@assets/about4.jpeg"

const AboutUs = () => {
  return (
    <div className='relative mx-auto text-lnblack flex flex-col'>
      <section className='gradient relative w-full flex flex-col h-[28em] md:h-[42em] gap-10 md:gap-20'>
        <div className='w-full text-center flex flex-col gap-5 items-center h-[25em] mt-30 md:mt-60'>
          <p className='text-xs md:text-sm text-white font-medium p-2 bg-secondary rounded-lg w-[25em] md:w-fit'>
            Innovation, Transparency, Excellent and Growth
          </p>
          <p className='text-2xl md:text-5xl text-black font-extrabold'>
            Building Excellence Together
          </p>
          <p className='md:w-[55em] text-sm md:text-lg px-8 md:px-0'>
            MateraPro is a digital platform for procurement of construction
            materials and showroom for excellent workers, saving clients’ time
            and minimizes delays in construction projects.
          </p>
        </div>
        <div className='bg-white border border-grey p-1 rounded-2xl h-[20em] md:h-[25em] mx-8 md:mx-18 shadow-md'>
          <img
            src={aboutHero}
            alt='Contact Us Hero image'
            className='relative rounded-xl object-cover h-full w-full z-20'
          />
        </div>
      </section>
      <section className='mt-30 md:mt-60 py-20 relative mx-auto px-8 md:px-80 w-full flex flex-col'>
        <div className='flex flex-col gap-4 md:gap-8 items-center text-center'>
          <p className='text-black text-2xl md:text-3xl font-extrabold'>
            Our Story
          </p>
          <p className='w-full md:w-[55em]'>
            The storyline behind the vision of MateraPro was born out of my
            desire to enhance various activities in the construction industry. I
            knew there had to be a better way of doing most of these activities
            and achieving better results in terms of cost and time, which would
            ultimately save clients and keep them profitable. During my
            undergraduate studies, I ensured that I optimized my internship
            opportunities, and along the way, I realized that the procurement
            process and access to excellent workers were significantly stressful
            and challenging aspects of the industry. The last experience I had
            during my internship was particularly painful as it cost the client
            millions of naira due to bad ethics and poor workers for a floor
            stamp, but his unavailability for nearly 48 hours after giving
            instructions led to this procurement department was also available,
            provided there was a digital platform to procure materials and
            access excellent workers. To avoid seeing this kind of experience in
            the industry, I came up with the idea of what MateraPro is all
            about.
          </p>
          <p className='font-bold text-black'>
            Ademola Olagbenro <br />
            CEO, MateraPro
          </p>
        </div>
        <AnimatedCard />
      </section>
      <ValuesSection />
      <div className='flex flex-col md:gap-10 mb-10'>
        <div className='flex flex-col md:flex-row items-center justify-center px-8 md:px-18 gap-10 py-5 md:pt-20'>
          <div className='md:w-1/2 bg-gray p-1 shadow-md rounded-2xl border border-gray'>
            <img
              src={about}
              alt='our core value'
              className='object-cover rounded-xl'
            />
          </div>
          <div className='text-primary font-bold md:w-1/3'>
            <p>
              Our core value as an organization is ITEG-{" "}
              <em>Innovation, Transparency, Excellent and Growth.</em>{" "}
            </p>
            <p className='py-10'>
              The organization priority is to create something BIG and BEAUTIFUL
              as we focus on revolving the{" "}
              <em>industry with our digital market space.</em>
            </p>
          </div>
        </div>
        <div className='flex flex-col md:ml-110 md:mr-30 px-8 gap-4 md:px-18'>
          <p className='text-black font-bold text-lg'>Our Mission</p>
          <p className='text-sm md:text-base'>
            Empower the construction industry by creating a unified digital
            marketplace that enhances seamless procurement of materials, fosters
            collaboration between clients and workers, and rives efficiency,
            transparency, and quality in construction projects.
          </p>
        </div>
        <div className='flex flex-col-reverse md:flex-row items-center justify-center px-8 md:px-60 gap-10 pt-10 md:py-5 md:pt-20 md:mb-10'>
          <div className=' flex flex-col gap-4 md:w-1/2'>
            <p className='text-black font-bold text-lg'>Our Vision </p>
            <p>
              To be the leading digital platform transforming the construction
              industry by connecting excellent stakeholders, optimizing
              procurement processes, and elevates the standards of collaboration
              and quality in every construction projects.
            </p>
          </div>
          <div className='bg-gray p-1 shadow-md rounded-2xl border border-gray'>
            <img
              src={vision}
              alt='our vision'
              className='object-cover rounded-xl w-90 h-70'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

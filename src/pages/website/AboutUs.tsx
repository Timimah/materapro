// pages/About.tsx
const AboutUs = () => {
  return (
    <div className='pt-20'>
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='text-4xl font-bold mb-6'>AboutUs MasteroPro</h1>
            <p className='text-gray-600 mb-12'>
              Transforming the construction industry through digital innovation
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold mb-6'>Our Mission</h2>
              <p className='text-gray-600 mb-6'>
                At MasteroPro, we're dedicated to revolutionizing the
                construction industry through innovative technology,
                unparalleled expertise, and a commitment to quality excellence.
              </p>
              <p className='text-gray-600'>
                Our team of seasoned professionals brings decades of combined
                experience in construction, technology, and project management
                to deliver solutions that make a difference.
              </p>
            </div>
            <div className='rounded-xl overflow-hidden'>
              {/* Add your about image here */}
              <div className='aspect-w-16 aspect-h-9 bg-gray-100'></div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-20 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>Our Values</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                title: "Innovation",
                description:
                  "Continuously pushing boundaries to improve construction processes",
              },
              {
                title: "Quality",
                description:
                  "Maintaining the highest standards in every project we facilitate",
              },
              {
                title: "Transparency",
                description:
                  "Building trust through open communication and honest practices",
              },
            ].map((value, idx) => (
              <div key={idx} className='bg-white p-6 rounded-xl shadow-sm'>
                <h3 className='text-xl font-semibold mb-4'>{value.title}</h3>
                <p className='text-gray-600'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs

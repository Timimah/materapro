import Input from "@/components/shared/Input"
import { useState } from "react"

// pages/Contact.tsx
const ContactUs = () => {
  const [searchValue, setSearchValue] = useState("")
  const [clauseValue, setClauseValue] = useState("")
  const [email, setEmail] = useState("")

  return (
    <div className='pt-20'>
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='text-center mb-12'>
              <h1 className='text-4xl font-bold mb-4'>Contact Us</h1>
              <p className='text-gray-600'>
                Get in touch with us for any questions or concerns
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
              {/* Contact Form */}
              <div className='bg-white p-6 rounded-xl shadow-sm'>
                <form className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Name
                    </label>
                    <input
                      type='text'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                      placeholder='Your name'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email
                    </label>
                    <input
                      type='email'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                      placeholder='Your email'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Message
                    </label>
                    <textarea
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                      rows={6}
                      placeholder='Your message'
                    ></textarea>
                  </div>
                  <button
                    type='submit'
                    className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition'
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className='space-y-8'>
                <div>
                  <h3 className='text-xl font-semibold mb-4'>
                    Office Location
                  </h3>
                  <p className='text-gray-600'>
                    123 Construction Avenue
                    <br />
                    Building District, CT 12345
                    <br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-4'>Contact Info</h3>
                  <p className='text-gray-600'>
                    Email: info@masteropro.com
                    <br />
                    Phone: +1 (555) 123-4567
                    <br />
                    Support: 24/7 Available
                  </p>
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-4'>Business Hours</h3>
                  <p className='text-gray-600'>
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='space-y-8 p-6 max-w-2xl mx-auto'>
        {/* Basic Input */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>General Input Examples</h2>
          <div className='space-y-4'>
            {/* Default */}
            <Input label='Default Input' placeholder='Enter your name' />

            {/* With Helper Text */}
            <Input
              label='With Helper Text'
              placeholder='Enter username'
              helperText='This will be your public display name'
            />

            {/* With Error */}
            <Input
              label='Error State'
              value='invalid@email'
              error='Please enter a valid email address'
            />

            {/* Success State */}
            <Input label='Success State' value='valid@email.com' isSuccess />

            {/* Disabled State */}
            <Input label='Disabled Input' value='Cannot edit this' disabled />
          </div>
        </div>

        {/* Search Input Examples */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Search Input Examples</h2>
          <div className='space-y-4'>
            {/* Default Search */}
            <Input
              variant='search'
              label='Search'
              placeholder='Search items...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue("")}
            />

            {/* Disabled Search */}
            <Input
              variant='search'
              label='Disabled Search'
              value='Locked search'
              disabled
            />

            {/* Search with Error */}
            <Input
              variant='search'
              label='Search with Error'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue("")}
              error='No results found'
            />
          </div>
        </div>

        {/* Clause Form Examples */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Clause Form Examples</h2>
          <div className='space-y-4'>
            {/* Default Clause */}
            <Input
              variant='clause'
              label='Clause Input'
              placeholder='Add clause...'
              value={clauseValue}
              onChange={(e) => setClauseValue(e.target.value)}
              onClear={() => setClauseValue("")}
            />

            {/* Clause with Error */}
            <Input
              variant='clause'
              label='Clause with Error'
              value='Invalid clause'
              error='This clause already exists'
              onClear={() => setClauseValue("")}
            />
          </div>
        </div>

        {/* Form Example */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Form Example</h2>
          <form
            className='space-y-4'
            onSubmit={(e) => {
              e.preventDefault()
              alert("Form submitted!")
            }}
          >
            <Input
              label='Email Address'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label='Password'
              type='password'
              placeholder='Enter your password'
              required
            />

            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
              Submit
            </button>
          </form>
        </div>

        {/* Real-time Validation Example */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Real-time Validation</h2>
          <Input
            label='Email Validation'
            type='email'
            placeholder='Enter email to validate'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              email && !email.includes("@")
                ? "Please enter a valid email address"
                : undefined
            }
            isSuccess={email && email.includes("@")}
          />
        </div>
      </div>
    </div>
  )
}

export default ContactUs

// import * as React from "react";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ContentPlaceholder } from "./ContentPlaceholder";

// const Accordion = ({ i, expanded, setExpanded }) => {
//   const isOpen = i === expanded;

//   // By using `AnimatePresence` to mount and unmount the contents, we can animate
//   // them in and out while also only rendering the contents of open accordions
//   return (
//     <>
//       <motion.header
//         initial={false}
//         animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
//         onClick={() => setExpanded(isOpen ? false : i)}
//       />
//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.section
//             key="content"
//             initial="collapsed"
//             animate="open"
//             exit="collapsed"
//             variants={{
//               open: { opacity: 1, height: "auto" },
//               collapsed: { opacity: 0, height: 0 }
//             }}
//             transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
//           >
//             <ContentPlaceholder />
//           </motion.section>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export const Example = () => {
//   // This approach is if you only want max one section open at a time. If you want multiple
//   // sections to potentially be open simultaneously, they can all be given their own `useState`.
//   const [expanded, setExpanded] = useState<false | number>(0);

//   return accordionIds.map((i) => (
//     <Accordion i={i} expanded={expanded} setExpanded={setExpanded} />
//   ));
// };

// const accordionIds = [0, 1, 2, 3];

// import * as React from "react";
// import { motion } from "framer-motion";
// import { mix } from "@popmotion/popcorn";

// const randomInt = (min, max) => Math.round(mix(min, max, Math.random()));
// const generateParagraphLength = () => randomInt(5, 20);
// const generateWordLength = () => randomInt(20, 100);

// // Randomly generate some paragraphs of word lengths
// const paragraphs = [...Array(3)].map(() => {
//   return [...Array(generateParagraphLength())].map(generateWordLength);
// });

// export const Word = ({ width }) => <div className="word" style={{ width }} />;

// const Paragraph = ({ words }) => (
//   <div className="paragraph">
//     {words.map(width => (
//       <Word width={width} />
//     ))}
//   </div>
// );

// export const ContentPlaceholder = () => (
//   <motion.div
//     variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
//     transition={{ duration: 0.8 }}
//     className="content-placeholder"
//   >
//     {paragraphs.map(words => (
//       <Paragraph words={words} />
//     ))}
//   </motion.div>
// );

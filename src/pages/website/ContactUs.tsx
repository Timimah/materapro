import { FormEvent, ChangeEvent } from "react"

interface InputProps {
  label: string
  placeholder?: string
  helperText?: string
  error?: string
  isSuccess?: boolean
  disabled?: boolean
  value?: string
  type?: string
  required?: boolean
  variant?: "default" | "search" | "clause"
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

const Input = ({
  label,
  placeholder,
  helperText,
  error,
  isSuccess,
  disabled,
  value,
  type = "text",
  required,
  variant = "default",
  onChange,
  onClear,
}: InputProps) => {
  return (
    <div className='relative'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
          error
            ? "border-red-500 focus:ring-red-200"
            : isSuccess
            ? "border-green-500 focus:ring-green-200"
            : "border-gray-300 focus:ring-blue-200"
        }`}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      {helperText && !error && (
        <p className='mt-1 text-sm text-gray-500'>{helperText}</p>
      )}
      {variant !== "default" && onClear && value && (
        <button
          type='button'
          onClick={onClear}
          className='absolute right-2 top-8 text-gray-400 hover:text-gray-600'
        >
          ×
        </button>
      )}
    </div>
  )
}

const ContactUs = () => {
  // const [searchValue, setSearchValue] = useState("")
  // const [clauseValue, setClauseValue] = useState("")
  // const [email, setEmail] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    alert("Form submitted!")
  }

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
              <div className='bg-white p-6 rounded-xl shadow-sm'>
                <form className='space-y-6' onSubmit={handleSubmit}>
                  <Input label='Name' placeholder='Your name' required />
                  <Input
                    label='Email'
                    type='email'
                    placeholder='Your email'
                    required
                  />
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Message
                    </label>
                    <textarea
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                      rows={6}
                      placeholder='Your message'
                      required
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

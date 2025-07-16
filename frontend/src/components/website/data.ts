import supply from "@assets/icons/bag.png"
import worker from "@assets/icons/profile-2user.png"
import collaborate from "@assets/icons/note.png"
import quality from "@assets/icons/3dcube.png"
import call from "@assets/icons/call.png"
import mail from "@assets/icons/sms.png"
import message from "@assets/icons/messages-2.png"
import visit from "@assets/icons/location.png"

export const services = [
  {
    title: "Supply Procurement",
    description: "Access quality materials from trusted suppliers",
    icon: supply,
  },
  {
    title: "Worker Showroom",
    description: "Find skilled workers for your projects",
    icon: worker,
  },
  {
    title: "Efficient Collaboration",
    description: "Connect with clients and workers seamlessly",
    icon: collaborate,
  },
  {
    title: "Transparency & Quality",
    description: "Ensure project success with our vetted workers",
    icon: quality,
  },
]

export const faqs = [
  {
    question: "What does MateraPro offer?",
    answer:
      "MateraPro is a digital marketplace that brings together everyone involved in construction — professionals, vendors, and suppliers — in one seamless and trustworthy platform. It helps you access real-time material prices and make smarter cost predictions for your projects.",
  },
  {
    question: "Why should I use MateraPro?",
    answer:
      "Whether you're a construction company, supplier, engineer, architect, artisan, or just someone needing building materials or services — MateraPro saves you time, cuts down costs, and takes the stress out of sourcing and procurement.",
  },
  {
    question: " How do I register on MateraPro?",
    answer:
      "Simply click the “Sign Up” button, choose your role (vendor, contractor, individual/client), fill in your details, and verify your email to get started.",
  },
  {
    question: " Is MateraPro free to use?",
    answer: "Yes! Signing up and exploring MateraPro is completely free.",
  },
  {
    question: "How do I make a purchase on MateraPro?",
    answer:
      "Log into your account, search for materials or services by location or type, review the supplier and product details, add items to your cart, and make a secure payment using our integrated payment system.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major debit and credit cards, as well as bank transfers — all powered securely through Paystack.",
  },
  {
    question: "What happens if there’s a dispute?",
    answer:
      "Don’t worry — we’ve got you. Use the Resolution Center on your dashboard to submit a complaint, or reach out to our support team directly for help.",
  },
  {
    question: "Can I list my construction business or materials on MateraPro?",
    answer:
      "Absolutely! If you’re a vendor or service provider, you can create a business profile and upload your products or services straight from your dashboard.",
  },
  {
    question: " Is my information safe on MateraPro?",
    answer:
      "Yes. We use top-tier encryption and security measures to keep your personal and financial data protected.                  ",
  },
  {
    question: " How can I contact customer support?",
    answer:
      "You can reach us anytime at support@materapro.com or by using the live chat feature on our website.",
  },
]

export const contactDetails = [
  {
    title: "Call us",
    description: "Mon to Fri from 8am to 5pm.",
    icon: call,
    details: "+234 913 5029 688",
  },
  {
    title: "Send a mail",
    description: "We are here to help",
    icon: mail,
    details: "materapro@gmail.com",
  },
  {
    title: "Chat with support",
    description: "Speak to our friendly team",
    icon: message,
    details: "materapro@gmail.com",
  },
  {
    title: "Visit us",
    description: "Visit our office headquarters",
    icon: visit,
    details: "View on Google Maps",
  },
]

export const animations = {
  cardAnimation: {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 2,
      },
    },
  },

  fadeInUp: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, delay: 2, ease: [0, 0.71, 0.2, 1.01] },
  },
}

export const companyInfo = {
  whyChooseUs:
    "At MateraPro, we are not only concerned about seamless procurement process, we also offer a showroom for skilled workers with work ethics and proven record of exceptional quality for construction clients to enjoy. Hence, we are structured to solving the issues involved in construction project, that often leads to elongations of completion period and unimaginable increase in cost of your construction project.",

  whatWeOffer:
    "We offer innovative solutions that promote excellent work ethics in the construction industry while driving efficiency.",

  whatSetsUsApart:
    "At MateraPro, we're dedicated to revolutionizing the construction industry through innovative technology, unparalleled expertise, and uncompromising quality assurance. Our team of seasoned professionals leverages cutting-edge tools to streamline processes, ensure precision craftsmanship, and maximize cost-effectiveness. With a relentless focus on excellence and customer satisfaction, we've established ourselves as the trusted partner for discerning clients seeking exceptional construction experiences.",
}

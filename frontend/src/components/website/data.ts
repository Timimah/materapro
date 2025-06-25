export const services = [
  {
    title: "Supply Procurement",
    description: "Access quality materials from trusted suppliers",
    icon: "📦",
  },
  {
    title: "Worker Showroom",
    description: "Find skilled workers for your projects",
    icon: "👷",
  },
  {
    title: "Efficient Collaboration",
    description: "Connect with clients and workers seamlessly",
    icon: "🤝",
  },
  {
    title: "Transparency & Quality",
    description: "Ensure project success with our vetted workers",
    icon: "✅",
  },
]

export const contactDetails = [
  {
    title: "Call us",
    description: "Mon to Fri from 8am to 5pm.",
    icon: "📦",
    details: "+234 913 5029 688",
  },
  {
    title: "Send a mail",
    description: "We are here to help",
    icon: "👷",
    details: "materapro@gmail.com",
  },
  {
    title: "Chat with support",
    description: "Speak to our friendly team",
    icon: "🤝",
    details: "materapro@gmail.com",
  },
  {
    title: "Visit us",
    description: "Visit our office headquarters",
    icon: "✅",
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
    "At MateraPro, we offer a showroom for skilled workers with excellent work ethics and proven records of exceptional quality for construction clients to enjoy. Hence, we are basically solving the issues involved in construction projects that leads to elongations of completion period and unachievable increase in cost of construction project.",

  whatWeOffer:
    "We offer innovative solutions that promote excellent work ethics in the construction industry while driving efficiency.",

  whatSetsUsApart:
    "At MateraPro, we're dedicated to revolutionizing the construction industry through innovative technology, unparalleled expertise, and uncompromising quality assurance. Our team of seasoned professionals leverages cutting-edge tools to streamline processes, ensure precision craftsmanship, and maximize cost-effectiveness. With a relentless focus on excellence and customer satisfaction, we've established ourselves as the trusted partner for discerning clients seeking exceptional construction experiences.",
}

import React from "react"
import Navbar from "@components/website/Navbar"
import PageWrapper from "@utils/PageWrapper"
import Footer from "@components/website/Footer"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PageWrapper>
      <div className='min-h-screen'>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </PageWrapper>
  )
}

export default Layout

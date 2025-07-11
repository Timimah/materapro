import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "../Layout"
import PageLoader from "@/utils/PageLoader"
import FAQPage from "@/pages/website/FAQPage"
import PrivacyPolicy from "@/pages/website/PrivacyPolicy"

// Lazy load pages for better performance
const Home = React.lazy(() => import("../pages/website/Home"))
const AboutUs = React.lazy(() => import("../pages/website/AboutUs"))
const ContactUs = React.lazy(() => import("../pages/website/ContactUs"))

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path='/about'
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path='/contact'
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path='/faqs'
          element={
            <Layout>
              <FAQPage />
            </Layout>
          }
        />
        <Route
          path='/privacy-policy'
          element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          }
        />
        {/* Auth routes can be added here */}
        {/* Protected routes can be added here */}

        {/* 404 route */}
        <Route
          path='*'
          element={
            <Layout>
              <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                  <h1 className='text-4xl font-bold text-gray-800 mb-4'>404</h1>
                  <p className='text-gray-600 mb-8'>Page not found</p>
                  <button
                    onClick={() => window.history.back()}
                    className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </React.Suspense>
  )
}

export default AppRoutes

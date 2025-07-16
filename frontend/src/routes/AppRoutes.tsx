import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "../Layout"
import PageLoader from "@/utils/PageLoader"
// import { ProtectedRoute } from "@/components/app/shared/ProtectedRoutes"
// import { ArtisanOnboarding } from "@/components/app/artisan/ArtisanOnboarding"
import OnboardingPage from "@/pages/shared/OnboardingPage"

// Lazy load pages for better performance
const Home = React.lazy(() => import("../pages/website/Home"))
const AboutUs = React.lazy(() => import("../pages/website/AboutUs"))
const ContactUs = React.lazy(() => import("../pages/website/ContactUs"))
const FAQPage = React.lazy(() => import("../pages/website/FAQPage"))
const PrivacyPolicy = React.lazy(() => import("../pages/website/PrivacyPolicy"))

// Auth pages
// const Login = React.lazy(() => import("./components/auth/Login"));
// const Register = React.lazy(() => import("./components/auth/Register"));

// // Onboarding pages
// const ClientOnboarding = React.lazy(() => import("./components/onboarding/ClientOnboarding"));
// const ArtisanOnboarding = React.lazy(() => import("./components/onboarding/ArtisanOnboarding"));

// // Dashboard pages
// const ClientDashboard = React.lazy(() => import("./pages/client/Dashboard"));
// const ArtisanDashboard = React.lazy(() => import("./pages/artisan/Dashboard"));

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
        {/* Auth routes */}
        {/* <Route path='/login' element={<Login />} /> */}
        {/* <Route path='/register' element={<Register />} /> */}

        {/* Protected routes can be added here */}
        {/* Client routes */}
        <Route
          path='/client/onboarding'
          element={
            // <ProtectedRoute userType='client'>
            <OnboardingPage />
            // </ProtectedRoute>
          }
        />
        {/* <Route
          path='/client/*'
          element={
            <ProtectedRoute userType='client' requireOnboarding>
              <ClientDashboard />
            </ProtectedRoute>
          }
        /> */}

        {/* Artisan routes */}
        {/* <Route
          path='/artisan/onboarding'
          element={
            <ProtectedRoute userType='artisan'>
              <ArtisanOnboarding />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path='/artisan/*'
          element={
            <ProtectedRoute userType='artisan' requireOnboarding>
              <ArtisanDashboard />
            </ProtectedRoute>
          }
        /> */}

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

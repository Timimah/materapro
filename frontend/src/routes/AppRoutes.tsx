import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "../Layout"
import PageLoader from "@/utils/PageLoader"
import {
  // ProtectedRoute,
  AuthRoute,
  ClientRoute,
} from "@/routes/ProtectedRoutes"
import OnboardingPage from "@/pages/shared/OnboardingPage"
import Login from "@/pages/shared/LogIn"
import WelcomePage from "@/pages/client/WelcomePage"
import CardDetails from "@/components/app/client/CardDetails"

// Lazy load pages for better performance
const Home = React.lazy(() => import("../pages/website/Home"))
const AboutUs = React.lazy(() => import("../pages/website/AboutUs"))
const ContactUs = React.lazy(() => import("../pages/website/ContactUs"))
const FAQPage = React.lazy(() => import("../pages/website/FAQPage"))
const PrivacyPolicy = React.lazy(() => import("../pages/website/PrivacyPolicy"))

// Auth pages - will be uncommented when needed
const CreateAccount = React.lazy(() => import("@/pages/shared/CreateAccount"))
const AccountSetup = React.lazy(() => import("@/pages/client/AccountSetup"))

// Onboarding pages - will be uncommented when needed
// const ClientOnboarding = React.lazy(() => import("@/pages/client/ClientOnboarding"));
// const ArtisanOnboarding = React.lazy(() => import("@/pages/artisan/ArtisanOnboarding"));

// Dashboard pages -- will be uncommented when needed
// const ClientDashboard = React.lazy(() => import("@/pages/client/Dashboard"));
// const ArtisanDashboard = React.lazy(() => import("@/pages/artisan/Dashboard"));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public website routes */}
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

        {/* Auth routes - only accessible when NOT logged in */}
        {/* <Route
          path='/login'
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        /> */}
        <Route
          path='/client/login'
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path='/client/welcome'
          element={
            <AuthRoute>
              <WelcomePage />
            </AuthRoute>
          }
        />
        <Route
          path='/client/onboarding'
          element={
            <AuthRoute>
              <OnboardingPage />
            </AuthRoute>
          }
        />

        {/* Client-specific routes - only accessible to clients */}

        {/* Future auth routes - commented until needed */}
        <Route
          path='/register'
          element={
            <AuthRoute>
              <CreateAccount />
            </AuthRoute>
          }
        />
        <Route
          path='/client/account-setup'
          element={
            <ClientRoute>
              <AccountSetup />
            </ClientRoute>
          }
        />
        <Route
          path='/client/account-setup/payment'
          element={
            <ClientRoute>
              <CardDetails />
            </ClientRoute>
          }
        />

        {/* Future protected routes - commented until needed */}
        {/* <Route
          path='/client/dashboard'
          element={
            <ClientRoute requireOnboarding>
              <ClientDashboard />
            </ClientRoute>
          }
        /> */}

        {/* Future artisan routes - commented until needed */}
        {/* <Route
          path='/artisan/onboarding'
          element={
            <ArtisanRoute>
              <ArtisanOnboarding />
            </ArtisanRoute>
          }
        /> */}
        {/* <Route
          path='/artisan/dashboard'
          element={
            <ArtisanRoute requireOnboarding>
              <ArtisanDashboard />
            </ArtisanRoute>
          }
        /> */}

        {/* Future supervisor routes - commented until needed */}
        {/* <Route
          path='/supervisor/dashboard'
          element={
            <SupervisorRoute requireOnboarding>
              <SupervisorDashboard />
            </SupervisorRoute>
          }
        /> */}

        {/* Future supplier routes - commented until needed */}
        {/* <Route
          path='/supplier/dashboard'
          element={
            <SupplierRoute requireOnboarding>
              <SupplierDashboard />
            </SupplierRoute>
          }
        /> */}

        {/* Future admin routes - commented until needed */}
        {/* <Route
          path='/admin/dashboard'
          element={
            <AdminRoute requireOnboarding>
              <AdminDashboard />
            </AdminRoute>
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

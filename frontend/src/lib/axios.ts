// import axios from "axios"
// import { useAuthStore } from "@/hooks/useAuthStore"

// const api = axios.create({
//   baseURL: "https://your-api.com/api",
// })

// api.interceptors.request.use(
//   async (config) => {
//     const token = useAuthStore.getState().accessToken
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       await useAuthStore.getState().refresh()
//       const token = useAuthStore.getState().accessToken
//       if (token) {
//         originalRequest.headers.Authorization = `Bearer ${token}`
//         return axios(originalRequest)
//       }
//     }
//     return Promise.reject(error)
//   }
// )

// export default api

import axios from "axios"
import { useAuthStore } from "@/hooks/useAuthStore"

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.materapro.com/v1",
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        await useAuthStore.getState().refreshToken()
        const newToken = useAuthStore.getState().token

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // If refresh fails, logout user and redirect to login
        useAuthStore.getState().logout()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api

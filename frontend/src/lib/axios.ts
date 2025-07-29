import axios from "axios"
import { useAuthStore } from "@/hooks/useAuthStore"

const api = axios.create({
  baseURL: "https://your-api.com/api",
})

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await useAuthStore.getState().refresh()
      const token = useAuthStore.getState().accessToken
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axios(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)

export default api

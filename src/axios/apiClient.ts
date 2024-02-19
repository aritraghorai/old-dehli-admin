import { TOKEN } from '@/utils/constant'
import Axios from 'axios'

const apiClient = Axios.create({ baseURL: "http://localhost:3000" })

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient


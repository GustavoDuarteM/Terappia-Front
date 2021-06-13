import axios from 'axios'
import store from '../../store'

const BASE_URL = 'https://boiling-beyond-42058.herokuapp.com/'

const mainAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const authAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

authAxiosInstance.interceptors.request.use(config => {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${store.getters.auth_token}`
    }
  return config
})


export {mainAxiosInstance, authAxiosInstance}
import axios from 'axios'

const BASE_URL = 'https://boiling-beyond-42058.herokuapp.com/'

const mainAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})


export {mainAxiosInstance}
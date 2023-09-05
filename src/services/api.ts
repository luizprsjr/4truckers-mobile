import axios from 'axios'

import { AppError } from '@utils/AppError'

const api = axios.create({
  baseURL: 'http://192.168.29.32:3333',
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(new AppError('Internal Server Error.'))
    }
  },
)

export { api }

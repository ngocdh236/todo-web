import axios from 'axios'

export const customAxios = axios.create({
  baseURL: 'http://muzify.eu/api'
})

export const setAuthToken = token => {
  if (token) {
    customAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    customAxios.defaults.headers.common['Content-Type'] = 'application/json'
  } else {
    delete customAxios.defaults.headers.common['Authorization']
  }
}

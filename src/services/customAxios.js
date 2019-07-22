import axios from 'axios'

export const customAxios = axios.create({
  baseURL: 'http://muzify.eu/api'
})

import customAxios from '../services/customAxios'

const setAuthToken = token => {
  if (token) {
    customAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    customAxios.defaults.headers.common['Content-Type'] = 'application/json'
  } else {
    delete customAxios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken

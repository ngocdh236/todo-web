import axios from 'axios'
import { GET_ERRORS } from './types'

export const getTodos = () => {
  return axios
    .get('/api/todos')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const createTodo = todo => {
  axios
    .post('/api/todos')
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data))
}

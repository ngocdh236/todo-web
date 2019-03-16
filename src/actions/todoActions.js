import axios from 'axios'

export const getTodos = async () => {
  return axios
    .get('/api/todos')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const createTodo = async (todo) => {
  return axios
    .post('/api/todos', todo)
    .then(res => res.data)
    .catch(err => console.log(err.response.data))
}

export const editTodo = async (todo) => {
  return axios
    .put('api/todos', todo)
    .then(res => res.data)
    .catch(err => console.log(err.response.data))
}

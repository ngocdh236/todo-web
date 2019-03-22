import axios from 'axios'

const todosUrl = '/api/todos'

export const getAllTodos = async () => {
  return axios
    .get(todosUrl)
    .then(res => res.data)
    .catch(err => err)
}

export const createTodo = async todo => {
  return axios
    .post(todosUrl, todo)
    .then(res => res)
    .catch(err => err)
}

export const updateTodo = async todo => {
  return axios
    .put(todosUrl, todo)
    .then(res => res)
    .catch(err => console.log(err.response.data))
}

export const getTodoById = async todoId => {
  return axios
    .get(`${todosUrl}/${todoId}`)
    .then(res => res.data)
    .catch(err => err)
}

export const deleteTodo = async todoId => {
  return axios
    .delete(`${todosUrl}/${todoId}`)
    .then(res => res)
    .catch(err => err)
}

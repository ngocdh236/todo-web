import axios from 'axios'

const todosUrl = '/api/todos'

export const getTodos = async () => {
  return axios
    .get(todosUrl)
    .then(res => res.data)
    .catch(err => err)
}

export const createTodo = async (todo) => {
  return axios
    .post(todosUrl, todo)
    .then(res => res)
    .catch(err => err)
}

export const editTodo = async (todo) => {
  return axios
    .put(todosUrl, todo)
    .then(res => res)
    .catch(err => err)
}

export const deleteTodo = async (todoId) => {
  return axios
  .delete(`${todosUrl}/${todoId}`)
  .then(res => res)
  .catch(err => err)
}

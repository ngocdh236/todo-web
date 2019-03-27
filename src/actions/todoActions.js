import axios from 'axios'

import { Types } from '.'

const todosUrl = '/api/todos'

export const getTodos = () => dispatch => {
  axios
    .get(todosUrl)
    .then(res => dispatch({ type: Types.SET_TODOS, todos: res.data }))
    .catch(err => err)
}

export const createTodo = todo => dispatch => {
  axios
    .post(todosUrl, todo)
    .then(res => dispatch({ type: Types.CREATE_TODO, todo: res.data }))
    .catch(err => err)
}

export const updateTodo = todo => dispatch => {
  axios
    .put(todosUrl, todo)
    .then(res => dispatch({ type: Types.UPDATE_TODO, todo }))
    .catch(err => console.log(err.response.data))
}

export const getTodoById = todoId => {
  return axios
    .get(`${todosUrl}/${todoId}`)
    .then(res => res.data)
    .catch(err => err)
}

export const deleteTodo = id => dispatch => {
  return () => {
    axios
      .delete(`${todosUrl}/${id}`)
      .then(res => dispatch({ type: Types.DELETE_TODO, id }))
      .catch(err => err)
  }
}

export const setFilter = (filter) => ({
  type: Types.SET_FILTER,
  filter
})

export const setFilterCategory = (filter, category) => ({
  type: Types.SET_FILTER_CATEGORY,
  filter,
  category
})

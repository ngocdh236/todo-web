import customAxios from './customAxios'

import { Types } from '.'

const todosURL = '/todos'

export const getTodos = () => dispatch => {
  customAxios
    .get(todosURL)
    .then(res => dispatch({ type: Types.SET_TODOS, todos: res.data }))
    .catch(err => err)
}

export const createTodo = todo => dispatch => {
  customAxios
    .post(todosURL, todo)
    .then(res => dispatch({ type: Types.CREATE_TODO, todo: res.data }))
    .catch(err => err)
}

export const updateTodo = todo => dispatch => {
  customAxios
    .put(todosURL, todo)
    .then(res => dispatch({ type: Types.UPDATE_TODO, todo }))
    .catch(err => console.log(err.response.data))
}

export const getTodoById = todoId => {
  return customAxios
    .get(`${todosURL}/${todoId}`)
    .then(res => res.data)
    .catch(err => err)
}

export const deleteTodo = id => dispatch => {
  return () => {
    customAxios
      .delete(`${todosURL}/${id}`)
      .then(res => dispatch({ type: Types.DELETE_TODO, id }))
      .catch(err => err)
  }
}

export const setFilter = filter => ({
  type: Types.SET_FILTER,
  filter
})

export const setFilterCategory = (filter, category) => ({
  type: Types.SET_FILTER_CATEGORY,
  filter,
  category
})

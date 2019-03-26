import axios from 'axios'

import {
  SET_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SET_VISIBILITY_FILTER
} from './types'

const todosUrl = '/api/todos'

export const getTodos = () => dispatch => {
  axios
    .get(todosUrl)
    .then(res => dispatch({ type: SET_TODOS, todos: res.data }))
    .catch(err => err)
}

export const createTodo = todo => dispatch => {
  axios
    .post(todosUrl, todo)
    .then(res => dispatch({ type: CREATE_TODO, todo: res.data }))
    .catch(err => err)
}

export const updateTodo = todo => dispatch => {
  axios
    .put(todosUrl, todo)
    .then(res => dispatch({ type: UPDATE_TODO, todo }))
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
      .then(res => dispatch({ type: DELETE_TODO, id }))
      .catch(err => err)
  }
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_DONE: 'SHOW_DONE',
  SHOW_TODO: 'SHOW_TODO',
  SHOW_DUE_SOON: 'SHOW_DUE_SOON',
  SHOW_BY_CATEGORY: 'SHOW_BY_CATEGORY'
}

export const setVisibilityFilter = (filter, category) => ({
  type: SET_VISIBILITY_FILTER,
  filter,
  category
})
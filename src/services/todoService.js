import { customAxios } from './customAxios'

import { Types } from '../reducers/actionTypes'

export function useTodoService(state, dispatch) {
  const todoURL = '/todos'

  const create = todo => {
    const newTodo = todo.category
      ? { ...todo, categoryId: todo.category.id }
      : todo
    customAxios
      .post(todoURL, newTodo)
      .then(res => dispatch({ type: Types.CREATE_TODO, todo: res.data }))
      .catch(err => console.log(err))
  }

  const getAll = () => {
    customAxios
      .get(todoURL)
      .then(res => dispatch({ type: Types.SET_TODOS, todos: res.data }))
      .catch(err => console.log(err))
  }

  const update = todo => {
    customAxios
      .put(todoURL, todo)
      .then(res => dispatch({ type: Types.UPDATE_TODO, todo: todo }))
      .catch(err => console.log(err))
  }

  const remove = id => {
    customAxios
      .delete(`${todoURL}/${id}`)
      .then(res => dispatch({ type: Types.DELETE_TODO, todoId: id }))
      .catch(err => console.log(err))
  }

  const setFilter = filter => {
    dispatch({ type: Types.SET_FILTER, filter })
  }

  const setCategoryFilter = categoryFilter => {
    dispatch({
      type: Types.SET_CATEGORY_FILTER,
      categoryFilter
    })
  }

  const setDateFilter = date => {
    dispatch({
      type: Types.SET_DATE_FILTER,
      dateFilter: { date }
    })
  }

  return {
    create,
    getAll,
    update,
    remove,
    setFilter,
    setCategoryFilter,
    setDateFilter
  }
}

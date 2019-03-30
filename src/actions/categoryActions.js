import axios from 'axios'

import { Types, Filters } from '.'

export const getCategories = () => dispatch => {
  axios
    .get('/api/categories')
    .then(res => dispatch({ type: Types.SET_CATEGORIES, categories: res.data }))
    .catch(err => console.log(err))
}

export const createCategory = category => async dispatch => {
  return axios
    .post('/api/categories', category)
    .then(res => {
      dispatch({ type: Types.CREATE_CATEGORY, category: res.data })
      return res
    })
    .then(res => {
      dispatch({
        type: Types.SET_FILTER_CATEGORY,
        filter: Filters.SHOW_BY_CATEGORY,
        category: res.data
      })
    })
    .catch(err => console.log(err.response.data))
}

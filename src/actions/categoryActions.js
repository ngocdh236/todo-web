import customAxios from './customAxios'

import { Types, Filters } from '.'

const categoryURL = '/categories'

export const getCategories = () => dispatch => {
  customAxios
    .get(categoryURL)
    .then(res => dispatch({ type: Types.SET_CATEGORIES, categories: res.data }))
    .catch(err => console.log(err))
}

export const createCategory = category => async dispatch => {
  return customAxios
    .post(categoryURL, category)
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

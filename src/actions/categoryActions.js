import axios from 'axios'

import { SET_CATEGORIES, CREATE_CATEGORY } from './types'

export const getCategories = () => dispatch => {
  axios
    .get('/api/categories')
    .then(res => dispatch({ type: SET_CATEGORIES, categories: res.data }))
    .catch(err => console.log(err))
}

export const createCategory = async category => {
  return axios
    .post('/api/categories', category)
    .then(res => res)
    .catch(err => console.log(err.response.data))
}

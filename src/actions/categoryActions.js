import axios from 'axios'

import { Types } from '.'

export const getCategories = () => dispatch => {
  axios
    .get('/api/categories')
    .then(res => dispatch({ type: Types.SET_CATEGORIES, categories: res.data }))
    .catch(err => console.log(err))
}

export const createCategory = async category => {
  return axios
    .post('/api/categories', category)
    .then(res => res)
    .catch(err => console.log(err.response.data))
}

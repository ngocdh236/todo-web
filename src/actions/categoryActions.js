import axios from 'axios'

import { Types } from '.'

export const getCategories = () => dispatch => {
  axios
    .get('/api/categories')
    .then(res => dispatch({ type: Types.SET_CATEGORIES, categories: res.data }))
    .catch(err => console.log(err))
}

export const createCategory = category => dispatch => {
  axios
    .post('/api/categories', category)
    .then(res => dispatch({ type: Types.CREATE_CATEGORY, category: res.data }))
    .catch(err => console.log(err.response.data))
}

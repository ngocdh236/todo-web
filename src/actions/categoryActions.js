import axios from 'axios'

export const getCategories = async () => {
  return axios
    .get('/api/categories')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const createCategory = async category => {
  return axios
    .post('/api/categories', category)
    .then(res => res)
    .catch(err => console.log(err.response.data))
}

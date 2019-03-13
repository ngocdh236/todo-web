import axios from 'axios'

export const getCategories = async () => {
  return axios
    .get('/api/categories')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}

export const createCategory = category => {
  axios
    .post('/api/categories', category)
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response.data))
}

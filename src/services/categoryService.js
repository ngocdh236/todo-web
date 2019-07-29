import { customAxios } from './customAxios'

import { Types } from '../reducers/actionTypes'
import { Filters } from '../utils/todoFilters'

const categoryURL = '/categories'

export function useCategoryService(date, dispatch) {
  const create = category => {
    customAxios
      .post(categoryURL, category)
      .then(res => {
        dispatch({ type: Types.CREATE_CATEGORY, category: res.data })
        return res
      })
      .then(res => {
        dispatch({
          type: Types.SET_CATEGORY_FILTER,
          categoryFilter: {
            filter: Filters.SHOW_BY_CATEGORY,
            categoryId: res.data.id
          }
        })
      })
      .catch(err => console.log(err))
  }

  const getAll = () => {
    customAxios
      .get(categoryURL)
      .then(res =>
        dispatch({ type: Types.SET_CATEGORIES, categories: res.data })
      )
      .catch(err => console.log(err))
  }

  return { create, getAll }
}

import React, { createContext, useReducer } from 'react'

import { initialState, reducer } from '../reducers/dataReducer'
import { useTodoService } from '../services/todoService'
import { useCategoryService } from '../services/categoryService'

export const DataContext = createContext()

export function DataProvider(props) {
  const [data, dispatchData] = useReducer(reducer, initialState)
  const todoService = useTodoService(data, dispatchData)
  const categoryService = useCategoryService(data, dispatchData)

  return (
    <DataContext.Provider
      value={{ data, dispatchData, todoService, categoryService }}
    >
      {props.children}
    </DataContext.Provider>
  )
}

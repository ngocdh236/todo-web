import '../styles/MainCategory.scss'

import React, { useContext, createRef, useState, useEffect } from 'react'

import FilterCard from '../components/FilterCard'
import TodoList from '../components/TodoList'
import { DataContext } from '../contexts/DataContext'
import { Filters } from '../utils/todoFilters'
import { isEmpty } from '../utils/isEmpty'

export default function MainCategory() {
  const { data, todoService, categoryService } = useContext(DataContext)
  const newCategoryInput = createRef()

  const [todos, setTodos] = useState([])
  const [showAddNewCategory, setShowAddNewCategory] = useState(false)
  const [newCategory, setNewCategory] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    if (showAddNewCategory) {
      newCategoryInput.current.focus()
    }
  }, [showAddNewCategory])

  useEffect(() => {
    const todoItems =
      (data.categoryFilter.category.id === -1 && data.todos) ||
      data.todos.filter(todo => todo.category === data.categoryFilter.category)
    setTodos(todoItems)
  }, [data.categoryFilter])

  const toggleAddNewCategory = () => {
    setShowAddNewCategory(!showAddNewCategory)
    setNewCategory('')
    setShowAlert(false)
    setWarning('')
  }

  const handleCreateCategory = () => {
    if (isEmpty(newCategory.name)) {
      setShowAlert(true)
      setWarning('Name must not be blank')
    } else {
      categoryService.create(newCategory)
      setNewCategory({})
      setShowAlert(false)
      setWarning('')
    }
  }

  const handleNewCategoryInput = e => {
    setNewCategory({ name: e.target.value })
  }

  const onEnterPressed = e => {
    if (e.key === 'Enter') {
      handleCreateCategory()
    }
  }

  const handleSetFilter = (filter, category) => {
    todoService.setCategoryFilter({
      filter,
      category
    })
  }

  const categories = data.categories.map(category => {
    return (
      <FilterCard
        key={category.id}
        category={category}
        active={data.categoryFilter.category === category}
        onClick={() => handleSetFilter(Filters.SHOW_BY_CATEGORY, category)}
      />
    )
  })

  return (
    <div className='MainCategory'>
      <div className='d-flex justify-content-between'>
        <button className='button-light mb-4' onClick={toggleAddNewCategory}>
          + New Category
        </button>
      </div>
      {showAddNewCategory && (
        <div className='new-category'>
          <input
            className='mr-2'
            value={newCategory.name ? newCategory.name : ''}
            onChange={handleNewCategoryInput}
            ref={newCategoryInput}
            onKeyDown={onEnterPressed}
          />
          <button className='button-light' onClick={handleCreateCategory}>
            Add
          </button>
        </div>
      )}
      {showAlert && (
        <div className='mt-3 alert alert-danger' role='alert'>
          {warning}
        </div>
      )}

      <br />

      <div className='dropdown'>
        <button
          className='dropbtn'
          style={{ minWidth: '100px', height: '40px' }}
        >
          {data.categoryFilter.category.name}
        </button>
        <div className='dropdown-content'>
          <FilterCard
            category={{
              id: -1,
              name: 'All',
              gradientColor: 'var(--background-primary)'
            }}
            active={data.categoryFilter.category.id === -1}
            onClick={() =>
              handleSetFilter(Filters.SHOW_ALL, { id: -1, name: 'All' })
            }
          />
          {categories}
        </div>
      </div>

      <div className='d-flex'>
        <div className='category-list'>
          <FilterCard
            category={{
              id: -1,
              name: 'All',
              gradientColor: 'var(--background-primary)'
            }}
            active={data.categoryFilter.category.id === -1}
            onClick={() =>
              handleSetFilter(Filters.SHOW_ALL, { id: -1, name: 'All' })
            }
          />
          <div
            className='horizontal-line'
            style={{ height: '30px', margin: '0 8px' }}
          />
          {categories}
        </div>
        <TodoList
          todos={todos}
          todoService={todoService}
          categories={data.categories}
        />
      </div>
    </div>
  )
}

import '../styles/MainCategory.scss'

import React, { useContext, createRef, useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

import FilterCard from '../components/FilterCard'
import TodoList from '../components/TodoList'
import { DataContext } from '../contexts/DataContext'
import { Filters } from '../utils/todoFilters'
import { isEmpty } from '../utils/isEmpty'

export default function MainCategory(props) {
  const { data, todoService, categoryService } = useContext(DataContext)
  const newCategoryInput = createRef()

  const [
    showAddNewCategoryInputField,
    setShowAddNewCategoryInputField
  ] = useState(false)
  const [newCategory, setNewCategory] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    if (showAddNewCategoryInputField) {
      newCategoryInput.current.focus()
    }
  }, [showAddNewCategoryInputField])

  const { category } = data.categoryFilter

  let todos
  switch (category.id) {
    case -1:
      todos = data.todos
      break
    default:
      todos = data.todos.filter(
        todo => todo.category && todo.category.id === category.id
      )
  }

  const toggleAddNewCategory = () => {
    setShowAddNewCategoryInputField(!showAddNewCategoryInputField)
    setNewCategory('')
    setShowAlert(false)
    setWarning('')
  }

  const handleCreateCategory = () => {
    if (isEmpty(newCategory.name)) {
      setShowAlert(true)
      setWarning('Name must not be blank')
    } else {
      categoryService.create(newCategory, props.history)
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

  const categories = data.categories.map(categoryItem => {
    return (
      <FilterCard
        key={categoryItem.id}
        category={categoryItem}
        isActive={category === categoryItem}
        onClick={() => handleSetFilter(Filters.SHOW_BY_CATEGORY, categoryItem)}
        to={categoryItem.id}
        isCategoryFilterCard
      />
    )
  })

  const TodoListOfCategory = () => (
    <TodoList
      todos={todos}
      todoService={todoService}
      categories={data.categories}
      categoryId={category.id}
    />
  )

  const FilterAllCard = () => (
    <FilterCard
      category={{
        id: -1,
        name: 'All',
        gradientColor: 'var(--background-primary)'
      }}
      isActive={category.id === -1}
      onClick={() => handleSetFilter(Filters.SHOW_ALL, { id: -1, name: 'All' })}
      to=''
      isCategoryFilterCard
    />
  )

  return (
    <div className='MainCategory'>
      <div className='d-flex justify-content-between'>
        <button className='button-light mb-2' onClick={toggleAddNewCategory}>
          + New Category
        </button>
      </div>
      {showAddNewCategoryInputField && (
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
          {category.name}
        </button>
        <div className='dropdown-content'>
          <FilterAllCard />
          {categories}
        </div>
      </div>

      <div className='d-flex'>
        <div className='category-list'>
          <FilterAllCard />
          <div
            className='horizontal-line'
            style={{ height: '30px', margin: '0 8px' }}
          />
          {categories}
        </div>
        <Route
          path={category.id > 0 ? '/categories/:id' : '/categories'}
          component={TodoListOfCategory}
        />
      </div>
    </div>
  )
}

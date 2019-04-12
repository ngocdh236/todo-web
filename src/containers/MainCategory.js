import '../styles/MainCategory.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CategorizedTodoList from './CategorizedTodoList'
import CategoryLink from './CategoryLink'
import { createCategory } from '../actions/categoryActions'
import { Filters } from '../actions'

class MainCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: props.todos,
      addNewCategory: false,
      newCategory: {}
    }

    this.newCategoryInput = React.createRef()

    this.toggleAddNewCategory = this.toggleAddNewCategory.bind(this)
    this.onNewCategoryChange = this.onNewCategoryChange.bind(this)
    this.addNewCategory = this.addNewCategory.bind(this)
  }

  toggleAddNewCategory() {
    this.setState({
      addNewCategory: !this.state.addNewCategory
    }, () => {
      if (this.state.addNewCategory) {
        this.newCategoryInput.current.focus()
      }
    })
  }

  addNewCategory() {
    this.props
      .createCategory(this.state.newCategory)
      .then(this.setState({ ...this.state, newCategory: {} }))
  }

  onNewCategoryChange(e) {
    this.setState({ ...this.state, newCategory: { name: e.target.value } })
  }

  render() {
    var categories = this.props.categories.map(category => {
      return (
        <CategoryLink
          key={category.id}
          category={category}
          filter={Filters.SHOW_BY_CATEGORY}
        />
      )
    })

    var newCategory = (
      <div className='new-category'>
        <input
          className='mr-2'
          value={this.state.newCategory.name ? this.state.newCategory.name : ''}
          onChange={this.onNewCategoryChange}
          ref={this.newCategoryInput}
        />
        <button className='btn btn-light' onClick={this.addNewCategory}>
          Add
        </button>
      </div>
    )

    return (
      <div className='MainCategory'>
        <button
          className='btn btn-light mb-4'
          onClick={this.toggleAddNewCategory}>
          + Add new
        </button>
        {this.state.addNewCategory ? newCategory : null}

        <br />

        <div className='dropdown'>
          <button className='dropbtn' style={{ minWidth: '100px', height: '40px' }}>
            {this.props.todosCategoryFilter.category.name}
          </button>
          <div className='dropdown-content'>
            <CategoryLink
              category={{ id: -1, name: 'All', gradientColor: 'white' }}
              icon=''
              filter={Filters.SHOW_ALL}
            />
            {categories}
          </div>
        </div>

        <div className='d-flex'>
          <div className='category-list'>
            <CategoryLink
              category={{ id: -1, name: 'All', gradientColor: 'white' }}
              icon=''
              filter={Filters.SHOW_ALL}
            />
            {categories}
          </div>
          <CategorizedTodoList />
        </div>
      </div>
    )
  }
}

MainCategory.propTypes = {
  todos: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object,
  todosCategoryFilter: PropTypes.object
}

const mapStateToProps = state => ({
  todos: state.todos,
  categories: state.categories,
  errors: state.errors,
  todosCategoryFilter: state.todosCategoryFilter
})

export default connect(
  mapStateToProps,
  { createCategory }
)(MainCategory)

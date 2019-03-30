import '../styles/MainCategory.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CategorizedTodoList from './CategorizedTodoList'
import CategorizedTodoLink from './CategorizedTodoLink'
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

    this.toggleAddNewCategory = this.toggleAddNewCategory.bind(this)
    this.onChange = this.onChange.bind(this)
    this.addNewCategory = this.addNewCategory.bind(this)
  }

  toggleAddNewCategory() {
    this.setState({
      addNewCategory: !this.state.addNewCategory
    })
  }

  addNewCategory() {
    this.props.createCategory(this.state.newCategory)
  }

  onChange(e) {
    this.setState({ ...this.state, newCategory: { name: e.target.value } })
  }

  render() {
    var categories = this.props.categories.map(category => {
      return (
        <CategorizedTodoLink
          key={category.id}
          category={category}
          filter={Filters.SHOW_BY_CATEGORY}
        />
      )
    })

    var newCategory = (
      <div className='new-category'>
        <input className='mr-2' onChange={this.onChange} />
        <button className='btn btn-primary' onClick={this.addNewCategory}>
          Add
        </button>
      </div>
    )

    return (
      <div className='MainCategory'>
        <button
          className='btn btn-primary mb-4'
          onClick={this.toggleAddNewCategory}>
          + Add new
        </button>
        {this.state.addNewCategory ? newCategory : null}

        <br />

        <div className='dropdown'>
          <button className='dropbtn'>
            {this.props.todosCategoryFilter.category.name}
          </button>
          <div className='dropdown-content'>
            <CategorizedTodoLink
              category={{ id: -1, name: 'All', gradientColor: 'white' }}
              icon=''
              filter={Filters.SHOW_ALL}
            />
            {categories}
          </div>
        </div>

        <div className='d-flex'>
          <div className='category-list'>
            <CategorizedTodoLink
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

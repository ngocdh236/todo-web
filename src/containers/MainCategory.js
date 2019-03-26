import '../styles/MainCategory.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import VisibleTodoList from './VisibleTodoList'
import FilterLink from './FilterLink'
import { VisibilityFilters } from '../actions/todoActions'

class MainCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: props.todos
    }
  }

  render() {
    var categories = this.props.categories.map(category => {
      return (
        <FilterLink
          key={category.id}
          category={category}
          filter={VisibilityFilters.SHOW_BY_CATEGORY}
        />
      )
    })

    return (
      <div className='MainCategory'>
        <div className='category-list'>
          <FilterLink
            category={{ id: 0, name: 'All', gradientColor: 'white' }}
            filter={VisibilityFilters.SHOW_ALL}
          />
          {categories}
        </div>
        <VisibleTodoList />
      </div>
    )
  }
}

MainCategory.propTypes = {
  todos: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  todos: state.todos,
  categories: state.categories,
  errors: state.errors
})

export default connect(mapStateToProps)(withRouter(MainCategory))

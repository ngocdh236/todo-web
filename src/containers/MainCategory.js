import '../styles/MainCategory.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import CategorizedTodoList from './CategorizedTodoList'
import CategorizedTodoLink from './CategorizedTodoLink'
import { Filters } from '../actions'

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
        <CategorizedTodoLink
          key={category.id}
          category={category}
          filter={Filters.SHOW_BY_CATEGORY}
        />
      )
    })

    return (
      <div className='MainCategory'>
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

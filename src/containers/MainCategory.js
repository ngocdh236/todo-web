import '../styles/MainCategory.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Category from './Category'
import TodoList from './TodoList'

class MainCategory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: props.todos
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick = category => {
    return () => {
      this.setState({
        todos: this.props.todos.filter(todo => {
          if (todo.category) return todo.category.id === category.id
        })
      })
    }
  }

  render() {
    var categories = this.props.categories.map(category => {
      return (
        <button key={category.id} onClick={this.onClick(category)}>
          <Category category={category} />
        </button>
      )
    })

    return (
      <div className='MainCategory'>
        <div className='category-list'>{categories}</div>
        <TodoList todos={this.state.todos} />
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

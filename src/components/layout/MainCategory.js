import '../../styles/MainCategory.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Category from '../common/Category'
import TodoList from '../common/TodoList'


class MainCategory extends Component {
  constructor() {
    super()

    this.state = {
      todos: []
    }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  onClick = category => {
    return () => {
      this.setState({
        todos: this.props.todos.filter(todo => todo.category === category)
      })
    }
  }

  render() {
    console.log(this.state.todos)
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

        <TodoList
          todos={this.state.todos}
          categories={this.props.categories}
          createTodo={this.props.createTodo}
          deleteTodo={this.props.deleteTodo}
          updateTodo={this.props.updateTodo}
        />
      </div>
    )
  }
}

MainCategory.propTypes = {
  createTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  auth: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  todos: state.todos,
  categories: state.categories,
  errors: state.errors
})

export default connect(mapStateToProps)(withRouter(MainCategory))

import '../styles/MainTodo.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Category from '../components/common/Category'
import TodoList from '../components/common/TodoList'
import { createTodo, updateTodo, deleteTodo } from '../actions/todoActions'

class MainTodo extends Component {
  render() {
    return (
      <div className='MainTodo'>
        <div className='header d-flex'>
          <Category
            category={{ id: 1, name: 'Done', gradientColor: '#417505' }}
            icon='far fa-check-circle'
          />
          <Category
            category={{ id: 2, name: 'Due Soon', gradientColor: '#D0021B' }}
            icon='far fa-clock'
          />
          <Category
            category={{ id: 3, name: 'Todo', gradientColor: '#F8E71C' }}
            icon='far fa-times-circle'
          />
        </div>

        <TodoList
          todos={this.props.todos}
          categories={this.props.categories}
          createTodo={this.props.createTodo}
          deleteTodo={this.props.deleteTodo}
          updateTodo={this.props.updateTodo}
        />
      </div>
    )
  }
}

MainTodo.propTypes = {
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

export default connect(
  mapStateToProps,
  { createTodo, updateTodo, deleteTodo }
)(withRouter(MainTodo))

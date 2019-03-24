import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../styles/MainTodo.scss'
import { connect } from 'react-redux'
import { getAllTodos } from '../../actions/todoActions'
import { withRouter } from 'react-router-dom'
import Category from '../common/Category'
import TodoList from '../common/TodoList'

class MainTodo extends Component {
  constructor() {
    super()
    this.state = {
      todoList: []
    }

    this.addToTodoList = this.addToTodoList.bind(this)
    this.removeFromTodoList = this.removeFromTodoList.bind(this)
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      getAllTodos().then(todoList => {
        console.log('getAllTodos' + todoList)
        this.setState({
          todoList: todoList
        })
      })
    }
  }

  addToTodoList(todo) {
    this.setState({
      ...this.state,
      todoList: [...this.state.todoList, todo]
    })
  }

  removeFromTodoList(todoId) {
    if (this.state.todoList) {
      var newTodos = this.state.todoList.filter(todo => todo.id !== todoId)
      this.setState({
        ...this.state,
        todoList: newTodos
      })
    }
  }

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

        <TodoList todoList={this.state.todoList} addToTodoList={this.addToTodoList} removeFromTodoList={this.removeFromTodoList} />
      </div>
    )
  }
}

MainTodo.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps)(withRouter(MainTodo))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MainTodo.scss'
import { connect } from 'react-redux'
import Todo from '../../common/Todo'
import { getTodos } from '../../../actions/todoActions'
import { withRouter } from 'react-router-dom'
import Category from '../../common/Category'

class MainTodo extends Component {
  constructor() {
    super()

    this.state = {
      todos: []
    }

    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    } else {
      getTodos().then(todos => {
        this.setState({
          todos: todos
        })
      })
    }
  }

  addTodo(todo) {
    this.setState({
      ...this.state,
      todos: [...this.state.todos, todo]
    })
  }

  deleteTodo(todoId) {
    if (this.state.todos) {
      var newTodos = this.state.todos.filter(todo => todo.id !== todoId)
      this.setState({
        ...this.state,
        todos: newTodos
      })
    }
  }

  render() {
    if (this.state.todos) {
      var todos = this.state.todos.map(todo => {
        return (
          <Todo
            key={todo.id.toString()}
            todo={todo}
            deleteTodo={this.deleteTodo}
          />
        )
      })
    }

    return (
      <div className='MainTodo'>
        <div className='header d-flex'>
          <Category
            id={1}
            name='Completed'
            gradientColor='#417505'
            icon='far fa-check-circle'
          />
          <Category
            id={2}
            name='Due Soon'
            gradientColor='#D0021B'
            icon='far fa-clock'
          />
          <Category
            id={3}
            name='Todo'
            gradientColor='#F8E71C'
            icon='far fa-times-circle'
          />
        </div>
        <div className='todo' ref={this.newTodo}>
          {todos}
          <div className='new-todo' ref='newTodo'>
            <Todo
              newTodo={true}
              todo={{
                done: false,
                title: ''
              }}
              addTodo={this.addTodo}
            />
          </div>
        </div>
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

import '../styles/TodoList.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Todo from './Todo'

class TodoList extends Component {
  render() {
    var todos = this.props.todos.all.map(todo => {
      return <Todo key={todo.id} todo={todo} />
    })

    return (
      <div className='TodoList'>
        {todos}
        <div className='new-todo'>
          <Todo
            newTodo={true}
            todo={{
              done: false,
              title: ''
            }}
          />
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

export default connect(mapStateToProps)(withRouter(TodoList))

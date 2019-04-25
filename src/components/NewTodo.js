import '../styles/Todo.scss'

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import isEmpty from '../validation/is-empty'

class NewTodo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: props.todo,
      updateTodo: false,
      alert: false,
      warning: ''
    }

    this.onCreate = this.onCreate.bind(this)
    this.onCancelCreate = this.onCancelCreate.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    var categoryId = this.props.todo.categoryId
    var deadline = this.props.todo.deadline

    if (
      categoryId !== prevProps.todo.categoryId ||
      deadline !== prevProps.todo.deadline
    ) {
      this.setState({
        ...this.state,
        todo: {
          ...this.state.todo,
          categoryId: categoryId && categoryId >= 0 ? categoryId : null,
          deadline: deadline ? deadline : null
        }
      })
    }
  }

  onTitleChange(e) {
    this.setState({
      ...this.state,
      updateTodo: true,
      todo: { ...this.state.todo, title: e.target.value }
    })
  }

  onCreate() {
    let todo = this.state.todo

    if (isEmpty(todo.title)) {
      this.setState({
        ...this.state,
        alert: true,
        warning: 'Title must not be blank'
      })
    } else {
      this.props.createTodo(todo)
      this.setState({
        ...this.state,
        todo: this.props.todo,
        updateTodo: false,
        newTodo: true,
        alert: false
      })
    }
  }

  onCancelCreate() {
    this.setState({
      ...this.state,
      updateTodo: false,
      todo: this.props.todo,
      showInfo: false,
      alert: false
    })
  }

  render() {
    const deadline = (() => {
      if (this.state.todo.deadline) {
        var deadline = moment
          .utc(this.state.todo.deadline)
          .format('DD/MM/YYYY, HH:mm')

        return <p className='text-secondary'>{deadline}</p>
      }
      return null
    })()

    return (
      <div className='Todo'>
        <div className='todo'>
          <div id='checkbox'>
            <button id='checkbox-button' />
          </div>

          <div className='d-flex flex-column mx-3' style={{ width: '100%' }}>
            <input
              type='text'
              value={this.state.todo.title}
              onChange={this.onTitleChange}
            />
            {deadline}
          </div>

          {this.state.updateTodo ? (
            <div style={{ display: 'flex' }}>
              <button onClick={this.onCreate}>
                <i
                  className='far fa-check-circle'
                  style={{ fontSize: '25px' }}
                />
              </button>
              <button onClick={this.onCancelCreate}>
                <i
                  className='far fa-times-circle'
                  style={{ fontSize: '25px' }}
                />
              </button>
            </div>
          ) : null}
        </div>

        {this.state.alert ? (
          <div className='mt-3 alert alert-danger' role='alert'>
            {this.state.warning}
          </div>
        ) : null}
      </div>
    )
  }
}

NewTodo.propTypes = {
  todo: PropTypes.object.isRequired,
  createTodo: PropTypes.func.isRequired
}

export default NewTodo

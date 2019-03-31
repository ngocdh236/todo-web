import '../styles/Todo.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTodoById } from '../actions/todoActions'
import TodoInfo from './TodoInfo'
import isEmpty from '../validation/is-empty'
import { createTodo, updateTodo } from '../actions/todoActions'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: props.newTodo,
      todo: props.todo,
      updateTodo: false,
      showInfo: false,
      alert: false,
      warning: ''
    }

    this.onDoneChange = this.onDoneChange.bind(this)
    this.onCreateOrUpdate = this.onCreateOrUpdate.bind(this)
    this.onCancelCreateOrUpdate = this.onCancelCreateOrUpdate.bind(this)
    this.onShowInfo = this.onShowInfo.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)

    this.todoElement = React.createRef()
  }

  componentDidMount() {
    var categoryId = this.props.todosCategoryFilter.category.id

    if (categoryId >= 0) {
      this.setState({
        ...this.state,
        todo: { ...this.state.todo, categoryId: categoryId }
      })
    }
  }

  componentDidUpdate(prevProps) {
    var categoryId = this.props.todosCategoryFilter.category.id
    if (categoryId !== prevProps.todosCategoryFilter.category.id) {
      if (categoryId >= 0) {
        this.setState({
          ...this.state,
          todo: { ...this.state.todo, categoryId: categoryId }
        })
      }
    }
  }

  onTitleChange(e) {
    this.setState({
      ...this.state,
      updateTodo: true,
      todo: { ...this.state.todo, title: e.target.value }
    })
  }

  onDoneChange() {
    if (!this.state.newTodo) {
      this.setState(
        {
          ...this.state,
          todo: { ...this.state.todo, done: !this.state.todo.done }
        },
        () => this.props.updateTodo(this.state.todo)
      )
    }
  }

  onCreateOrUpdate = todo => {
    return () => {
      if (isEmpty(this.state.todo.title)) {
        this.setState({
          ...this.state,
          alert: true,
          warning: 'Title must not be blank'
        })
      } else {
        if (this.state.newTodo) {
          this.props.createTodo(todo)
          this.setState({
            updateTodo: false,
            newTodo: this.props.newTodo,
            todo: this.props.todo,
            alert: false
          })
        } else {
          this.props.updateTodo(todo)

          this.setState({
            ...this.state,
            todo: todo,
            updateTodo: false,
            alert: false,
            showInfo: false
          })
        }
      }
    }
  }

  onCancelCreateOrUpdate() {
    if (this.state.newTodo) {
      this.setState({
        ...this.state,
        updateTodo: false,
        todo: this.props.todo
      })
    } else {
      getTodoById(this.state.todo.id).then(todo => {
        this.setState({
          ...this.state,
          updateTodo: false,
          todo: todo,
          showInfo: false
        })
      })
    }
  }

  onShowInfo() {
    this.setState({
      ...this.state,
      showInfo: !this.state.showInfo
    })
  }

  render() {
    const done = this.state.todo.done

    const checkMark = (
      <div id='checkbox-checkmark' onClick={this.onDoneChange} />
    )

    return (
      <div className='Todo'>
        <div className='todo'>
          <div id='checkbox'>
            <button id='checkbox-button' onClick={this.onDoneChange} />
            {done ? checkMark : null}
          </div>

          <input
            type='text'
            value={this.state.todo.title}
            onChange={this.onTitleChange}
          />

          {this.state.updateTodo ? (
            <div style={{ display: 'flex' }}>
              <button onClick={this.onCreateOrUpdate(this.state.todo)}>
                <i
                  className='far fa-check-circle'
                  style={{ fontSize: '25px' }}
                />
              </button>
              <button onClick={this.onCancelCreateOrUpdate}>
                <i
                  className='far fa-times-circle'
                  style={{ fontSize: '25px' }}
                />
              </button>
            </div>
          ) : null}

          {!this.state.newTodo ? (
            <button onClick={this.onShowInfo}>
              <i className='fas fa-info-circle' />
            </button>
          ) : null}
        </div>

        {this.state.alert ? (
          <div className='mt-3 alert alert-danger' role='alert'>
            {this.state.warning}
          </div>
        ) : null}

        {this.state.showInfo ? (
          <TodoInfo
            todo={this.props.todo}
            categories={this.props.categories}
            onInfoDoneClick={this.onCreateOrUpdate}
          />
        ) : null}
      </div>
    )
  }
}

Todo.propTypes = {
  newTodo: PropTypes.bool,
  todo: PropTypes.object,
  categoryId: PropTypes.number,
  createTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  todosCategoryFilter: PropTypes.object
}

Todo.defaultProps = {
  newTodo: false
}

const mapStateToProps = state => ({
  todos: state.todos,
  errors: state.errors,
  todosCategoryFilter: state.todosCategoryFilter
})

export default connect(
  mapStateToProps,
  { createTodo, updateTodo }
)(Todo)

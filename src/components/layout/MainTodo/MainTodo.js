import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MainTodo.scss'
import { connect } from 'react-redux'
import Todo from '../../common/Todo'
import { getTodos } from '../../../actions/todoActions'
import { withRouter } from 'react-router-dom'

class MainTodo extends Component {
  constructor() {
    super()

    this.togglePopup = this.togglePopup.bind(this)

    this.state = {
      showPopup: false,
      todos: []
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  componentWillMount() {
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

  togglePopup(event) {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    const todos = this.state.todos.map(todo => {
      return (
        <Todo
          key={todo.id.toString()}
          createdAt={todo.createdAt}
          id={todo.id}
          title={todo.title}
          done={todo.done}
        />
      )
    })

    return (
      <div className='main-todo'>
        <div className='header d-flex mt-5'>
          <h4 className='my-auto'>TODO</h4>
          <button
            onClick={this.togglePopup}
            className='ml-auto'
          >
            + Add new
          </button>
        </div>
        <div className='d-flex mt-5'>
          <div className='nav'>
            <label>All</label>
          </div>

          <div className='main'>{todos}</div>

          {this.state.showPopup ? (
            <Popup closePopup={this.togglePopup} />
          ) : null}
        </div>
      </div>
    )
  }
}

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <button onClick={this.props.closePopup} className='btn btn-light'>
            Cancel
          </button>
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

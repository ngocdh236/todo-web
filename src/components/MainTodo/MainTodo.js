import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MainTodo.scss'
import { connect } from 'react-redux'
import Todo from '../templates/Todo'
import { getTodos } from '../../actions/todoActions'
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

  componentWillMount() {
    getTodos().then(todos => {
      this.setState({
        todos: todos
      })
    })
  }

  togglePopup(event) {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    const todos = []

    this.state.todos.forEach(todo => {
      todos.push(<Todo />)
    })

    return (
      <div>
        <div className='header d-flex mt-5'>
          <h4 className='my-auto'>TODO</h4>
          <button
            onClick={this.togglePopup}
            className='btn btn-primary ml-auto'
          >
            + Add new
          </button>
        </div>
        <div className='d-flex mt-5'>
          <div className='nav d-flex flex-column'>
            <label>All</label>
            <label>Work</label>
            <label>Home</label>
            <label>Travelling</label>
          </div>

          <div className='main d-flex flex-column'>
            {/* {this.state.todos.map(() => {
              return <Todo />
            })} */}

            {todos}
          </div>

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

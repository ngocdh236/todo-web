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

    this.togglePopup = this.togglePopup.bind(this)

    this.state = {
      showPopup: false,
      newTodo: false,
      todos: []
    }

    this.newTodo = React.createRef()
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

  togglePopup(event) {
    // this.setState({
    //   showPopup: !this.state.showPopup
    // })
    this.setState({
      newTodo: !this.state.newTodo
    })
    window.scrollTo(0, this.newTodo.current.offsetTop)
  }

  render() {
    if (this.state.todos) {
      var todos = this.state.todos.map(todo => {
        return <Todo key={todo.id.toString()} todo={todo} />
      })
    }

    return (
      <div className='MainTodo'>
        <button onClick={this.togglePopup} className='ml-auto'>
          + Add new
        </button>
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
          {/* {this.state.newTodo ? ( */}
          <div className='new-todo' ref='newTodo'>
            <Todo
              newTodo={true}
              todo={{
                done: false,
                title: ''
              }}
            />
          </div>
          {/* ) : null} */}
        </div>

        {this.state.showPopup ? <Popup closePopup={this.togglePopup} /> : null}
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

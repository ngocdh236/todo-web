import React from 'react'
import './Todo.scss'
import PropTypes from 'prop-types'
import { editTodo } from '../../actions/todoActions'

class Todo extends React.Component {
  constructor() {
    super()
    this.state = {
      newTodo: false,
      todo: {
        category: {},
        createdAt: '',
        deadline: '',
        description: '',
        done: false,
        id: 0,
        title: ''
      }
    }

    this.onButtonDoneClick = this.onButtonDoneClick.bind(this)
    this.onButtonAddNewClick = this.onButtonAddNewClick.bind(this)
    this.onButtonCancelNewClick = this.onButtonCancelNewClick.bind(this)
    this.onButtonInfoClick = this.onButtonInfoClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    this.setState({
      newTodo: this.props.newTodo,
      todo: {
        category: {},
        createdAt: this.props.createdAt,
        deadline: '',
        description: this.props.description,
        done: this.props.done,
        id: this.props.id,
        title: this.props.title  
      }
    })
  }

  onChange(e) {
    this.setState({ newTodo: true })
    this.setState({ todo: { ...this.state.todo, title: e.target.value } })
  }

  onButtonDoneClick() {
    this.setState({ todo: { ...this.state.todo, done: !this.state.todo.done } })
  }

  onButtonAddNewClick() {}

  onButtonCancelNewClick() {
    this.setState({
      newTodo: false,
      todo: { ...this.state.todo, title: this.props.title }
    })
  }

  onButtonInfoClick() {}

  render() {
    const done = this.state.todo.done

    const checkMark = (
      <div id='checkbox-checkmark' onClick={this.onButtonDoneClick} />
    )

    return (
      <div className='Todo'>
        <div id='checkbox'>
          <button id='checkbox-button' onClick={this.onButtonDoneClick} />
          {done ? checkMark : null}
        </div>

        <input
          type='text'
          className='inputField'
          value={this.state.todo.title}
          onChange={this.onChange}
        />

        {this.state.newTodo ? (
          <div style={{ display: 'flex' }}>
            <button onClick={this.onButtonAddNewClick}>
              <i className='far fa-check-circle' style={{ fontSize: '25px' }} />
            </button>
            <button onClick={this.onButtonCancelNewClick}>
              <i className='far fa-times-circle' style={{ fontSize: '25px' }} />
            </button>
          </div>
        ) : (
          <button>
            <i
              className='fas fa-info-circle'
              onClick={this.onButtonInfoClick}
            />
          </button>
        )}
      </div>
    )
  }
}

Todo.propTypes = {
  newTodo: PropTypes.bool,
  category: PropTypes.object,
  createdAt: PropTypes.string,
  deadline: PropTypes.string,
  description: PropTypes.string,
  done: PropTypes.bool,
  id: PropTypes.number,
  title: PropTypes.string,
  updatedAt: PropTypes.string
}

export default Todo

import React from 'react'
import './Todo.scss'
import PropTypes from 'prop-types'

class Todo extends React.Component {
  constructor() {
    super()
    this.state = {
      createdAt: '',
      id: '',
      title: '',
      description: '',
      category: {},
      done: false,
      deadline: ''
    }

    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ title: e.target.value })
  }

  onClick() {
    this.setState({ done: !this.state.done })
  }

  componentWillMount() {
    this.setState({
      createdAt: this.props.createdAt,
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      category: {},
      done: this.props.done,
      deadline: ''
    })
  }

  render() {
    const done = this.state.done

    const checkMark = <div id='checkbox-checkmark' onClick={this.onClick} />

    return (
      <div className='Todo'>
        <div className='todo-template'>
          <div id='checkbox'>
            <button id='checkbox-button' onClick={this.onClick} />
            {done ? checkMark : null}
          </div>

          <input
            type='text'
            className='inputField'
            value={this.state.title}
            onChange={this.onChange}
          />
        </div>
        <hr />
      </div>
    )
  }
}

Todo.propTypes = {
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  category: PropTypes.string,
  done: PropTypes.bool.isRequired,
  deadline: PropTypes.string
}

export default Todo

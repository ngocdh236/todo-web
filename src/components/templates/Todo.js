import React from 'react'
import './Todo.scss'

class Todo extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      isDone: false,
      category: {}
    }
  
    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({title: e.target.value})
  }

  onClick() {
    this.setState({isDone: !this.state.isDone})
  }

  render() {
    const isDone = this.state.isDone

    const checkMark = <div id='checkbox-checkmark' onClick={this.onClick} />

    return (
      <div className='todo-template'>
        <div id='checkbox'>
          <button id='checkbox-button' onClick={this.onClick} />
          {isDone ? checkMark : null}
        </div>

        <input
          type='text'
          className='inputField'
          value={this.state.title}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default Todo

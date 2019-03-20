import React from 'react'
import PropTypes from 'prop-types'

class TodoInfo extends React.Component {
  constructor(props) {
    super()
    this.state = {
      todo: props.todo
    }
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
  }

  onTitleChange(e) {
    this.setState({
      todo: { ...this.state.todo, title: e.target.value }
    })
  }

  onDescriptionChange(e) {
    this.setState({
      todo: { ...this.state.todo, description: e.target.value }
    })
  }

  render() {
    return (
      <div className='info p-2'>
        <input
          type='text'
          className='input font-weight-bold'
          value={this.state.todo.title}
          onChange={this.onTitleChange}
        />

        <div className='horizontal-line my-3' />

        <div className='table table-borderless'>
          <tbody>
            <tr>
              <td className='text-secondary' scope='row'>
                Description
              </td>
              <td>
                <textarea
                  type='text'
                  className='input autoExpand'
                  value={
                    this.state.todo.description
                      ? this.state.todo.description
                      : undefined
                  }
                  onChange={this.onDescriptionChange}
                />
              </td>
            </tr>
          </tbody>
        </div>

        <div className='buttons'>
          <button
            className='button-delete ml-1'
            onClick={this.props.onDeleteClick}>
            Delete
          </button>
          <button className='button-done ml-1' onClick={this.props.onDoneClick}>
            Done
          </button>
        </div>
      </div>
    )
  }
}

TodoInfo.propTypes = {
  todo: PropTypes.object,
  onDoneClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}

export default TodoInfo

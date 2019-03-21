import React from 'react'
import PropTypes from 'prop-types'
import { getCategories } from '../../actions/categoryActions'
import '../../styles/TodoInfo.scss'

class TodoInfo extends React.Component {
  constructor(props) {
    super()
    this.state = {
      todo: props.todo,
      categoryList: []
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

  componentDidMount() {
    getCategories().then(categoryList => {
      this.setState({
        ...this.state,
        categoryList: categoryList
      })
    })
  }

  render() {
    var categoryList = this.state.categoryList.map(category => {
      return <button key={category.id}>{category.name}</button>
    })

    var category = this.state.todo.category
    var description = this.state.todo.description

    return (
      <div className='TodoInfo p-2'>
        <input
          type='text'
          className='input font-weight-bold'
          value={this.state.todo.title}
          onChange={this.onTitleChange}
        />

        <div className='horizontal-line my-3' />

        <table className='table table-borderless'>
          <tbody>
            <tr>
              <td className='text-secondary'>
                Description
              </td>
              <td>
                <textarea
                  type='text'
                  className='input autoExpand'
                  value={description ? description : undefined}
                  onChange={this.onDescriptionChange}
                />
              </td>
            </tr>

            <tr>
              <td className='text-secondary'>
                Category
              </td>
              <div className='dropdown'>
                <button className='dropbtn'>
                  {category ? category.name : 'Choose category'}
                </button>
                <div className='dropdown-content'>{categoryList}</div>
              </div>
            </tr>
          </tbody>
        </table>

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

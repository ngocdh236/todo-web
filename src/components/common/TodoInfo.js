import React from 'react'
import PropTypes from 'prop-types'
import { getCategories } from '../../actions/categoryActions'
import '../../styles/TodoInfo.scss'

class TodoInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: props.todo,
      categoryList: []
    }
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onDoneClick = this.onDoneClick.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
  }

  onTitleChange(e) {
    this.setState(
      {
        todo: { ...this.state.todo, title: e.target.value }
      },
      () => {
        this.props.onInfoChange(this.state.todo)
      }
    )
  }

  onDescriptionChange(e) {
    this.setState(
      {
        todo: { ...this.state.todo, description: e.target.value }
      },
      () => {
        this.props.onInfoChange(this.state.todo)
      }
    )
  }

  onCategoryChange(category) {
    this.setState(
      {
        todo: { ...this.state.todo, category: category }
      },
      () => {
        this.props.onInfoChange(this.state.todo)
      }
    )
  }

  onDoneClick() {
    this.props.onInfoDoneClick(this.state.todo)
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
      return (
        <button key={category.id} onClick={() => this.onCategoryChange(category)}>
          {category.name}
        </button>
      )
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
              <td className='text-secondary'>Description</td>
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
              <td className='text-secondary'>Category</td>
              <td>
                <div className='dropdown'>
                  <button className='dropbtn'>
                    {category ? category.name : 'Choose category'}
                  </button>
                  <div className='dropdown-content'>{categoryList}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className='buttons'>
          <button
            className='button-delete ml-1'
            onClick={this.props.onDeleteClick}>
            Delete
          </button>
          <button className='button-done ml-1' onClick={this.onDoneClick}>
            Done
          </button>
        </div>
      </div>
    )
  }
}

TodoInfo.propTypes = {
  todo: PropTypes.object,
  onInfoDoneClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onInfoChange: PropTypes.func
}

export default TodoInfo

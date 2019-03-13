import React from 'react'
import './Todo.scss'
import PropTypes from 'prop-types'
import './Category.scss'

class Category extends React.Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: ''
    }

    // this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ name: e.target.name })
  }

  // componentWillMount() {
  //   this.setState({
  //     id: this.props.id,
  //     name: this.props.name
  //   })
  // }

  render() {
    return (
      <div className='Category'>
        <div className='name'>
          <label>alo</label>
        </div>
      </div>
    )
  }
}

// Category.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired
// }

export default Category

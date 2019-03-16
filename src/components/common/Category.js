import React from 'react'
import './Todo.scss'
import PropTypes from 'prop-types'
import './Category.scss'
import Todo from './Todo'

class Category extends React.Component {
  constructor() {
    super()
    this.state = {
      id: '',
      name: '',
      gradientColor: '',
      icon: ''
    }

    // this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ name: e.target.name })
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      gradientColor: this.props.gradientColor,
      icon: this.props.icon
    })
  }

  render() {
    return (
      <div className='Category'>
        <div className='icon' style={{ background: this.state.gradientColor }}>
          <i className={this.state.icon} style={{ color: 'white', fontSize: '20px'}} />
        </div>
        <div className='info'>
          <p>{this.state.name}</p>
          <p>8 tasks</p>
        </div>
      </div>
    )
  }
}

Category.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  gradientColor: PropTypes.string,
  icon: PropTypes.string
}

export default Category

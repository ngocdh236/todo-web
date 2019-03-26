import '../styles/Category.scss'

import React from 'react'
import PropTypes from 'prop-types'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: props.icon,
      category: props.category
    }
  }

  render() {
    var gradientColor = this.state.category.gradientColor
    return (
      <button
        className='Category'
        disabled={this.props.active}
        onClick={this.props.onClick}>
        <div className='icon' style={{ background: gradientColor }}>
          <i
            className={this.state.icon}
            style={{ color: 'white', fontSize: '20px' }}
          />
        </div>
        <div className='info'>
          <p>{this.state.category.name}</p>
        </div>
      </button>
    )
  }
}

Category.propTypes = {
  icon: PropTypes.string,
  category: PropTypes.object,
  onClick: PropTypes.func
}

export default Category

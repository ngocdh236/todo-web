import '../styles/Category.scss'

import React from 'react'
import PropTypes from 'prop-types'

class Category extends React.Component {
  render() {
    var gradientColor = this.props.category.gradientColor
    return (
      <button
        className='Category'
        disabled={this.props.active}
        onClick={this.props.onClick}>
        <div className='icon' style={{ background: gradientColor }}>
          <i
            className={this.props.icon}
            style={{ color: 'white', fontSize: '20px' }}
          />
        </div>
        <div className='info'>
          <p>{this.props.category.name}</p>
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

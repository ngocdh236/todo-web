import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/Category.scss'

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
      <div className='Category'>
        <div className='icon' style={{ background: gradientColor }}>
          <i
            className={this.state.icon}
            style={{ color: 'white', fontSize: '20px' }}
          />
        </div>
        <div className='info'>
          <p>{this.state.category.name}</p>
          <p>8 tasks</p>
        </div>
      </div>
    )
  }
}

Category.propTypes = {
  icon: PropTypes.string,
  category: PropTypes.object
}

export default Category

import '../styles/FilterCard.scss'

import React from 'react'
import PropTypes from 'prop-types'

export default function FilterCard(props) {
  const { category, icon, active, onClick } = props
  return (
    <button className='FilterCard' disabled={active} onClick={onClick}>
      <div className='icon' style={{ background: category.gradientColor }}>
        <i
          className={icon}
          style={{ color: 'var(--background-primary)', fontSize: '20px' }}
        />
      </div>
      <div className='info'>
        <label>{category.name}</label>
      </div>
    </button>
  )
}

FilterCard.propTypes = {
  category: PropTypes.object.isRequired,
  icon: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

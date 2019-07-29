import '../styles/FilterCard.scss'

import React from 'react'
import PropTypes from 'prop-types'

export default function FilterCard(props) {
  return (
    <button
      className='FilterCard'
      disabled={props.active}
      onClick={props.onClick}
    >
      <div className='icon' style={{ background: props.gradientColor }}>
        <i
          className={props.icon}
          style={{ color: 'var(--background-primary)', fontSize: '20px' }}
        />
      </div>
      <div className='info'>
        <label>{props.name}</label>
      </div>
    </button>
  )
}

FilterCard.propTypes = {
  category: PropTypes.object,
  icon: PropTypes.string,
  onClick: PropTypes.func
}

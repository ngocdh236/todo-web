import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const InputField = ({
  name,
  placeholder,
  value,
  info,
  type,
  onChange,
  disabled,
  error
}) => {
  return (
    <div className='form-group'>
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && (
        <div className='invalid-feedback text-left'>
          {placeholder} {error.defaultMessage}
        </div>
      )}
    </div>
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  error: PropTypes.object
}

InputField.defaultProps = {
  type: 'text'
}

export default InputField

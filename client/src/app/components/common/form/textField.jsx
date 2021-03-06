import PropTypes from 'prop-types'
import React, { useState } from 'react'

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : ' is-valid')
  }

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {type === 'password' && (
          <button
            className={'btn btn-outline' + (error ? '-danger' : '-success')}
            type="button"
            onClick={toggleShowPassword}>
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextField

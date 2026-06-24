import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div className='container-togglable'>
      <div style={hide}>
        <button className='btn-togglable' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={show}>
        {props.children}
      </div>

      <button style={show} className='btn-togglable cancel' onClick={toggleVisibility}>Cancel</button>
    </div>
  )
})

export default Togglable
/* eslint-disable react/display-name */
import React, { useState, useImperativeHandle } from 'react'
import { Button, } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant='danger' size='sm' onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
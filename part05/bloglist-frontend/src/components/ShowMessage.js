/* eslint-disable react/prop-types */
import React from 'react'

const ShowMessage = ({ message, type }) => {
    if (message === null) {
        return null
    }
    return (
        <div className={type}>
            {message}
        </div>
    )
}


export default ShowMessage
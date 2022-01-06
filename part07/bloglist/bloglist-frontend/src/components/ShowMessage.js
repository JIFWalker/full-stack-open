import React from 'react'
import { useSelector } from 'react-redux'

const ShowMessage = () => {
    const notification = useSelector(state => state.notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        color: (notification[1] !== 'error') ? 'green' : 'red',
        display: (notification !== 'none') ? '' : 'none'
    }

    return (
        <div style={style}>
            {notification[0]}
        </div>
    )
}


export default ShowMessage
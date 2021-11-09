
const reducer = (state = 'none', action) => {
    switch(action.type) {
        case 'notification/set':
            return action.payload
        case 'notification/clear':
            return 'none'
        default:
            return state
    }
}

export const setNotification = (message, time) => {
    const seconds = time*1000

    return async dispatch => {
        dispatch({
            type: 'notification/set',
            payload: message
        })
        setTimeout(() => {
            dispatch(notificationTimeout())
        }, seconds)
    }
}

export const notificationTimeout = () => {
    return {
        type: 'notification/clear',
        payload: ''
    }
}



export default reducer
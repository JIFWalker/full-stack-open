
const initialState = ''

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'notification/new':
            return `'${action.payload}' added!`
        case 'notification/vote':
            return `you voted '${action.payload}'`
        default:
            return state
    }
}

export const voteNotification = content => {
    return {
    type: 'notification/vote',
    payload: content
    }
}

export const newNotification = content => {
    return {
        type: 'notification/new',
        payload: content
    }
}



export default reducer
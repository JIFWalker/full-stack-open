
const initialState = [
    '',
    'none'
]

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'notification/new':
            const newAnecdote = [
                `'${action.payload}' added!`, ''
            ]
            return newAnecdote
        case 'notification/vote':
            const voteAnecdote = [
                `you voted '${action.payload}'`,
                ''
           ]
            return voteAnecdote
        case 'notification/timeout':
            const cleared = [
                '',
                'none'
            ]
            return cleared
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

export const notificationTimeout = () => {
    return {
        type: 'notification/timeout',
        payload: null
    }
}



export default reducer
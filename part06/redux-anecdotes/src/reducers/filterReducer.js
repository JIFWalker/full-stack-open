

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'filter/set':
            console.log('action.payload', action.payload);
            state = action.payload
            console.log('state', state)
            return state
        default:
            return state
    }   
}

export const setFilter = (value) => {
    return {
        type: 'filter/set',
        payload: value
    }
}


export default reducer
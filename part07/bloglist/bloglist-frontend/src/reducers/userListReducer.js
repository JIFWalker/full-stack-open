import userListService from '../services/userList'

const reducer = (state =[], action) => {
    switch (action.type) {
    case 'userList/init':
        return action.payload
    default:
        return state
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const userList = await userListService.getAll()
        dispatch({
            type: 'userList/init',
            payload: userList
        })
    }
}


export default reducer
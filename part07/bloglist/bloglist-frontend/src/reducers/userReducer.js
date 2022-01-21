import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'user/init':
        return action.payload
    case 'user/login':
        return action.payload
    case 'user/logout':
        return action.payload

    default:
        return state
    }
}

export const initializeUser = (loggedUserJSON) => {
    return async dispatch => {
        const user = await JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        dispatch({
            type: 'user/init',
            payload: user
        })
    }
}

export const login = ( username, password ) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password
        })

        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'user/login',
            payload: user
        })
    }
}

export const logout = () => {
    return {
        type: 'user/logout',
        payload: null
    }
}

export default reducer
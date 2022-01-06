import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'blog/init':
        return action.payload
    default:
        return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogList = await blogService.getAll()
        dispatch({
            type: 'blog/init',
            payload: blogList,
        })
        console.log(reducer)
    }
}


export default reducer
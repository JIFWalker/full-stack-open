import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'blog/init':
        return action.payload

    case 'blog/new':
        return state.concat(action.payload)

    case 'blog/like':
    {
        const id = action.payload.id
        const blogToLike = state.find(blog => blog.id === id)

        const updatedBlog = {
            ...blogToLike,
            likes: blogToLike.likes + 1
        }
        return state.map(blog => blog.id !== id ? blog : updatedBlog)
    }

    case 'blog/remove':
    {
        const id = action.payload.id
        return state.filter(blog => blog.id !== id)
    }

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
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        await blogService.create(content)
        dispatch({
            type: 'blog/new',
            payload: content
        })
    }
}

export const updateLikes = (blog) => {
    return async dispatch => {
        const likedBlog = {
            author: blog.author,
            id: blog.id,
            likes: blog.likes + 1,
            title: blog.title,
            url: blog.url,
        }
        await blogService.update(likedBlog)
        dispatch({
            type: 'blog/like',
            payload: blog
        })
    }
}

export const deleteBlog = (removedBlog) => {
    return async dispatch => {
        await blogService.remove(removedBlog.id)
        dispatch({
            type: 'blog/remove',
            payload: removedBlog
        })
    }
}


export default reducer
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { updateLikes } from '../reducers/blogReducer'

const Blog = ({ blog, loggedUser }) => {
    const dispatch = useDispatch()
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        borderWidth: 1,
        marginBottom: 10
    }
    if (!blog) {
        return null
    }

    const blogOwnerID = JSON.stringify(blog.user)
    const userID = JSON.stringify(loggedUser.id)

    const isAuthor = () => (blogOwnerID.includes(userID)) ? '' : 'none'

    const removeBlog = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`) === true) {


            try {
                dispatch(
                    deleteBlog(blog)
                )

                dispatch(
                    setNotification([`${blog.title} was removed!`, 'notification'], 10)
                )
            } catch (exception) {
                dispatch(
                    setNotification(
                        [exception.toString(), 'error'], 10)
                )
            }
        }
    }

    const likeButton = (blog) => {
        try {
            dispatch(
                updateLikes(blog)
            )

            dispatch(
                setNotification(
                    [`${blog.title} was liked!`, 'notification'], 10)
            )

        } catch (exception) {
            dispatch(
                setNotification(
                    [exception.toString(), 'error'], 10)
            )
        }
    }

    return(

        <div style={blogStyle}>
            <div key={blog.id} className='blog' >
                <h2 className='titleAndAuthor' style={{ display: 'inline', paddingRight: 5 }}>
                    {blog.title} -{blog.author}
                </h2>

                <div>
                    <a className='url' href={blog.url}>{blog.url}</a>

                    <div>
                        <p className='likes' style={{ display: 'inline', paddingRight: 5 }} >{blog.likes}</p>
                        <button type='button' className='likeButton'  onClick={() => likeButton(blog)}>like</button>
                    </div>

                    <button type='button' style={{ display: isAuthor() }} onClick={() => removeBlog(blog)}>remove</button>
                </div>
            </div>

        </div>
    )
}

export default Blog


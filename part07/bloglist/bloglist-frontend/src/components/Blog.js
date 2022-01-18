/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { updateLikes } from '../reducers/blogReducer'

const Blog = ({ blog, loggedUser }) => {
    const dispatch = useDispatch()
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [visibility, setVisibility] = useState(false)
    const [blogOwnerID, setBlogOwnerID] = useState(JSON.stringify(blog.user))
    const [userID, setUserID] = useState(JSON.stringify(loggedUser.id))

    const hideWhenVisible = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }

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
                <div className='titleAndAuthor' style={{ display: 'inline', paddingRight: 5 }}>
                    {blog.title} -{blog.author}
                </div>

                <button type='button' style={hideWhenVisible} onClick={() => setVisibility(true)}>view</button>
                <button type='button' style={showWhenVisible} onClick={() => setVisibility(false)}>hide</button>

                <div style={showWhenVisible} className='toggleableContent'>
                    <p className='url' >{blog.url}</p>

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
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import LikeButton from './LikeButton'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [visibility, setVisibility] = useState(false)

    const hideWhenVisible = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }

    const isAuthor = () => () => {
        return (blog.user.id === user.id) ?  '' :  'none'
    }

    return(

        <div style={blogStyle}>
            <div key={blog.id}>

                {blog.title}

                <button type='button' style={hideWhenVisible} onClick={() => setVisibility(true)}>view</button>
                <button type='button' style={showWhenVisible} onClick={() => setVisibility(false)}>hide</button>

                <div style={showWhenVisible}>
                    <p>{blog.url}</p>

                    <p>{blog.likes}
                        <button type='button' onClick={() => LikeButton(blog, updateLikes)}>like</button>
                    </p>

                    <p>{blog.author}</p>

                    <button type='button' style={{ display: isAuthor() }} onClick={() => removeBlog(blog)}>remove</button>
                </div>
            </div>

        </div>
    )
}

export default Blog
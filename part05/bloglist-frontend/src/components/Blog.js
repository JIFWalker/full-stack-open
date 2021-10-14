/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import LikeButton from './LikeButton'

const Blog = ({ blog, updateLikes, }) => {
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

    return(
        <div style={blogStyle}>
            <div key={blog.id}>
                {blog.title}
                <button style={hideWhenVisible} onClick={() => setVisibility(true)}>view</button>
                <div style={showWhenVisible}>
                    <p>{blog.author}</p>
                    <p>{blog.url}</p>
                    <p>{blog.likes}
                        <button onClick={() => LikeButton(blog, updateLikes)}>like</button>
                    </p>
                    <button onClick={() => setVisibility(false)}>cancel</button>
                </div>
            </div>

        </div>
    )
}

export default Blog
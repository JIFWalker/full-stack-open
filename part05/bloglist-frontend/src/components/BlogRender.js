/* eslint-disable react/prop-types */
import React from 'react'


const BlogRender = ({ blogs, Blog, user, handleLogout }) => {
    if (!blogs[0].id) {
        return (
            <div>
                <h2>blogs</h2>
            Loading...
            </div>
        )
    } else {
        return (
            <div>
                <h2>blogs</h2>

                <p>
                    {user} logged in
                    <button onClick = {handleLogout}>logout</button>
                </p>

                {blogs.map(blog =>
                    <Blog key = {blog.id} blog = {blog} />

                )}

            </div>
        )}
}

export default BlogRender
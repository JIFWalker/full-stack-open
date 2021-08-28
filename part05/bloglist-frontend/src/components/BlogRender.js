/* eslint-disable react/prop-types */
import React from 'react'


const BlogRender = ({ blogs, Blog, user }) => {
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

                <div>{user} logged in</div>

                <br></br>

                {blogs.map(blog =>
                    <Blog key = {blog.id} blog = {blog} />

                )}

            </div>
        )}
}

export default BlogRender
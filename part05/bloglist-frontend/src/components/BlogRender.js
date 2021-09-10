/* eslint-disable react/prop-types */
import React from 'react'
import AddBlog from './AddBlog'


const BlogRender = ({ blogs, Blog, user, handleLogout, setBlog, newBlog, createBlog }) => {
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
                <div>
                    <AddBlog
                        setBlog={setBlog}
                        newBlog={newBlog}
                        createBlog={createBlog}
                    />
                </div>

                {blogs.map(blog => {
                    console.log('blog.id', blog.title, blog.id)
                    return (
                        <Blog key = {blog.id} blog = {blog} />)
                }
                )}

            </div>
        )}
}

export default BlogRender
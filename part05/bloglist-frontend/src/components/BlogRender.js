/* eslint-disable react/prop-types */
import React from 'react'
import AddBlog from './AddBlog'

const BlogRender = ({
    blogs,
    Blog,
    setBlog,
    newBlog,
    createBlog
}) => {
    if (!blogs[0].id) {
        return (
            <div>
            Loading...
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <AddBlog
                        setBlog={setBlog}
                        newBlog={newBlog}
                        createBlog={createBlog}
                    />
                </div>

                {blogs.map(blog =>
                    <Blog key = {blog.id} blog = {blog} />)
                }

            </div>
        )}
}

export default BlogRender
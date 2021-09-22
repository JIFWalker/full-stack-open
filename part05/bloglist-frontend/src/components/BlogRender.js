/* eslint-disable react/prop-types */
import React from 'react'

const BlogRender = ({
    blogs,
    Blog,
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
                {blogs.map(blog =>
                    <Blog
                        key = {blog.id}
                        blog = {blog}
                    />)
                }
            </div>
        )}
}

export default BlogRender
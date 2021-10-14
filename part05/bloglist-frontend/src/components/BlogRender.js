/* eslint-disable react/prop-types */
import React from 'react'

const BlogRender = ({
    blogs,
    Blog,
    updateLikes,
}) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    if (!blogs[0].id) {
        return (
            <div>
            Loading...
            </div>
        )
    } else {
        return (
            <div>
                {sortedBlogs.map(blog =>
                    <Blog
                        key = {blog.id}
                        blog = {blog}
                        updateLikes={updateLikes}
                    />)
                }
            </div>
        )}
}

export default BlogRender
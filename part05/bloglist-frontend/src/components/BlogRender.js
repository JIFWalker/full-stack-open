/* eslint-disable react/prop-types */
import React from 'react'

const BlogRender = ({
    blogs,
    Blog,
    updateLikes,
    removeBlog,
    user,
}) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    if (blogs.length === 0) {
        return (
            <h2>
                No blogs in list!
            </h2>
        )
    } else if (!blogs[0].id) {
        return (
            <div>
            Loading...
            </div>
        )
    } else {
        return (
            <div>
                { sortedBlogs.map(blog =>
                    <Blog
                        key = {blog.id}
                        blog = {blog}
                        updateLikes={updateLikes}
                        removeBlog={removeBlog}
                        user={user}
                    />)
                }
            </div>
        )}
}

export default BlogRender
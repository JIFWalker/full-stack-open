/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

const BlogRender = ({
    blogs,
    Blog,
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
            <div id='blogs'>
                {sortedBlogs.map(blog => {
                    return (
                        <div key={blog.id}>
                            <Link to={`/blogs/${blog.id}`} >
                                {blog.title}
                            </Link>
                        </div>
                    )
                })}
            </div>
        )}
}
export default BlogRender
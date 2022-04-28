/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

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
                <ListGroup>
                    {sortedBlogs.map(blog => {
                        return (
                            <ListGroup.Item key={blog.id}>
                                <Link to={`/blogs/${blog.id}`} >
                                    {blog.title}
                                </Link>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        )}
}
export default BlogRender
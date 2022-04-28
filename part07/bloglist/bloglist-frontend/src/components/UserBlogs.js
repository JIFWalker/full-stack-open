import React from 'react'
import { ListGroup } from 'react-bootstrap'

const UserBlogs = ({ user }) => {


    if (!user) {
        return null
    }

    const blogs = user.blogs.map( blog => {
        return (
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        )
    })

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>Added Blogs</h4>

            <ListGroup>
                {blogs}
            </ListGroup>
        </div>
    )
}

export default UserBlogs
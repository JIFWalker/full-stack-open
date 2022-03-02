import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogs = () => {
    const id = useParams().id
    const user = useSelector(state => state.userList.find(
        user => String(user.id) === String(id)
    ))

    if (!user) {
        return null
    }

    const blogs = user.blogs.map( blog => {
        return (
            <li key={blog.id}>{blog.title}</li>
        )
    })

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>Added Blogs</h4>

            {blogs}

        </div>
    )
}

export default UserBlogs
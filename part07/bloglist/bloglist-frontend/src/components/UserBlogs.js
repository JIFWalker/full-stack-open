import React from 'react'

const UserBlogs = ({ user }) => {


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
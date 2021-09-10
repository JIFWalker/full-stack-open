/* eslint-disable react/prop-types */
import React from 'react'

const Blog = ({ blog }) => (

    <div key={blog.id}>
            &quot;{blog.title}&quot; - {blog.author}
    </div>

)

export default Blog
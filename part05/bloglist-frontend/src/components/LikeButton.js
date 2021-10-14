/* eslint-disable no-unused-vars */
import React from 'react'

const LikeButton = ( blog, updateLikes ) => {
    blog = {
        author: blog.author,
        id: blog.id,
        likes: blog.likes + 1,
        title: blog.title,
        url: blog.url,
    }
    updateLikes(blog)
}

export default LikeButton
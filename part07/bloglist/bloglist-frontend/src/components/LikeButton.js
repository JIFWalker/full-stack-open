/* eslint-disable no-unused-vars */
import React from 'react'


const LikeButton = ( blog, updateLikes ) => {
    const likedBlog = {
        author: blog.author,
        id: blog.id,
        likes: blog.likes + 1,
        title: blog.title,
        url: blog.url,
    }
    updateLikes(likedBlog)
}

export default LikeButton
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import LikeButton from './LikeButton'

const Blog = ({ blog, updateLikes, removeBlog, loggedUser }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [visibility, setVisibility] = useState(false)
    const [blogOwnerID, setBlogOwnerID] = useState(JSON.stringify(blog.user))
    const [userID, setUserID] = useState(JSON.stringify(loggedUser.id))

    const hideWhenVisible = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }

    const isAuthor = () => (blogOwnerID.includes(userID)) ? '' : 'none'



    return(

        <div style={blogStyle}>
            <div key={blog.id} className='blog' >
                <div className='titleAndAuthor' style={{ display: 'inline', paddingRight: 5 }}>
                    {blog.title} -{blog.author}
                </div>
                <button type='button' style={hideWhenVisible} onClick={() => setVisibility(true)}>view</button>
                <button type='button' style={showWhenVisible} onClick={() => setVisibility(false)}>hide</button>

                <div style={showWhenVisible} className='toggleableContent'>
                    <p className='url' >{blog.url}</p>

                    <div>
                        <p className='likes' style={{ display: 'inline', paddingRight: 5 }} >{blog.likes}</p>
                        <button type='button' className='likeButton'  onClick={() => LikeButton(blog, updateLikes)}>like</button>
                    </div>


                    <button type='button' style={{ display: isAuthor() }} onClick={() => removeBlog(blog)}>remove</button>
                </div>
            </div>

        </div>
    )
}

export default Blog
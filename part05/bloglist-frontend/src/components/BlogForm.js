/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const AddBlog = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })

    const handleChange = (event) => {
        const value = event.target.value
        setNewBlog({
            ...newBlog,
            [event.target.name]: value
        })
    }

    const addBlog = () => {
        createBlog(newBlog)

        setNewBlog({
            title: '',
            author: '',
            url: '',
        })
    }
    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addBlog}>
                <div>
        Title:
                    <input
                        id='title'
                        type='text'
                        value={newBlog.title}
                        name='title'
                        onChange={handleChange}
                    />
                </div>
                <div>
        Author
                    <input
                        id='author'
                        type='text'
                        value={newBlog.author}
                        name='author'
                        onChange={handleChange}
                    />
                </div>
                <div>
        url
                    <input
                        id='url'
                        type='text'
                        value={newBlog.url}
                        name='url'
                        onChange={handleChange}
                    />
                </div>
                <button id='create' type='submit'>create</button>
            </form>
        </div>
    )
}

export default AddBlog
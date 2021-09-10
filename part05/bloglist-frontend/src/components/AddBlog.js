/* eslint-disable react/prop-types */
import React from 'react'

const AddBlog = ({ setBlog, newBlog, createBlog }) => {
    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={createBlog}>
                <div>
        Title:
                    <input
                        type='text'
                        value={newBlog.title}
                        name='title'
                        onChange = {setBlog}
                    />
                </div>
                <div>
        Author
                    <input
                        type='text'
                        value={newBlog.author}
                        name='author'
                        onChange={setBlog}
                    />
                </div>
                <div>
        url
                    <input
                        type='text'
                        value={newBlog.url}
                        name='url'
                        onChange={setBlog}
                    />
                </div>
                <button type='submit' >create</button>
            </form>
        </div>
    )
}

export default AddBlog
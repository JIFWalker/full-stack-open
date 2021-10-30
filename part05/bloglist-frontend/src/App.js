/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogRender from './components/BlogRender'
import LoginForm from './components/LoginForm'
import ShowMessage from './components/ShowMessage'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
    const [blogs, setBlogs] = useState([{  }])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState([null, ''])
    const [user, setUser] = useState(null)

    useEffect(async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = await JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
        await updateData()
    }, [])

    const updateData = async () => {
        const initialBlogs = await blogService.getAll()
        setBlogs(initialBlogs)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessage(['Login Succesful!', 'notification'])
            messageTimeout()
        } catch (exception) {
            setMessage([exception.toString(), 'error'])
            messageTimeout()
        }
    }

    const handleLogout = (event) => {
        try {
            window.localStorage.clear()
            blogService.setToken(null)
            setUser(null)
        } catch (exception) {
            setMessage([exception.toString(), 'error'])
            messageTimeout()
        }
    }

    const createBlog = (newBlog) => {
        try {
            blogService.create(newBlog)
                .then(setBlogs(blogs.concat(newBlog)))
                .then(blogFormRef.current.toggleVisibility())


            setMessage(
                [`a new blog titled "${newBlog.title}" was created!`, 'notification'])
            messageTimeout()
        } catch (exception) {
            setMessage([exception.toString(), 'error'])
            messageTimeout()
        }
    }

    const updateLikes = (likedBlog) => {
        try {
            let blogIndex = blogs.findIndex(blog => blog.id === likedBlog.id),
                updatedBlogs = [...blogs]

            blogService
                .update(likedBlog)
                .then(updatedBlogs[blogIndex] = likedBlog)
                .then(setBlogs(updatedBlogs))

            setMessage(
                [`${likedBlog.title} was liked!`, 'notification'])
            messageTimeout()
            updateData()
        } catch (exception) {
            setMessage([exception.toString(), 'error'])
            messageTimeout()
        }
    }

    const removeBlog = (removedBlog) => {
        if (window.confirm(`Remove blog ${removedBlog.title} by ${removedBlog.author}?`) === true) {

            const updatedBlogs = blogs.filter(blog => blog.id  !== removedBlog.id)

            try {
                blogService
                    .remove(removedBlog.id)
                    .then(setBlogs(updatedBlogs))

                setMessage([`${removedBlog.title} was removed!`, 'notification'])
                messageTimeout()
            } catch (exception) {
                setMessage([exception.toString(), 'error'])
                messageTimeout()
            }
        }
    }

    const passwordSetter = (event) => {
        setPassword(event)
    }

    const usernameSetter = (event) => {
        setUsername(event)
    }

    const messageTimeout = () => {
        setTimeout(() => {
            setMessage([null, ''])
        }, 5000)
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Toggleable buttonLabel='Add Blog' ref={blogFormRef}>
            <BlogForm
                createBlog={createBlog}
            />
        </Toggleable>
    )


    return (
        <div>
            <h2>Blogs List</h2>
            <ShowMessage
                message={message[0]}
                type={message[1]}
            />
            {user === null
                ?
                <div>
                    <h2>Log In To Application</h2>
                    <LoginForm
                        username={username}
                        password={password}
                        handleLogin={handleLogin}
                        setPassword={passwordSetter}
                        setUsername={usernameSetter}
                    />
                </div>
                :
                <div>
                    <p>
                        {user.name} has logged in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    <h2>Blogs</h2>
                    <div>{blogForm()}</div>
                    <BlogRender
                        blogs={blogs}
                        Blog={Blog}
                        updateLikes={updateLikes}
                        removeBlog={removeBlog}
                        user={user}
                        updateData={updateData}
                    />
                </div>
            }

        </div>
    )
}

export default App
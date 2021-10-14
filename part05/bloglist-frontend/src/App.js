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

    useEffect(() => {
        updateData()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const updateData = () => {
        blogService
            .getAll().then(initialBlogs => {
                setBlogs( initialBlogs )
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
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

    const handleLogout = async (event) => {
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
            blogFormRef.current.toggleVisibility()
            blogService
                .create(newBlog)
                .then(returnedBlogs => {
                    setBlogs(blogs.concat(newBlog))
                })

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
            const blogIndex = blogs.findIndex(blog => blog.id ===likedBlog.id),
                updatedblogs = [...blogs]
            blogService
                .update(likedBlog)
                .then(blogs[blogIndex] = likedBlog)

            setMessage(
                [`${likedBlog.title} was liked!`, 'notification'])
            messageTimeout()
        } catch (exception) {
            setMessage([exception.toString(), 'error'])
            messageTimeout()
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
                    {blogForm()}
                    <BlogRender
                        blogs={blogs}
                        Blog={Blog}
                        updateLikes={updateLikes}
                    />
                </div>
            }

        </div>
    )
}

export default App
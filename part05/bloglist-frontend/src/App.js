/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogRender from './components/BlogRender'
import LoginForm from './components/LoginForm'
import ShowMessage from './components/ShowMessage'

const App = () => {
    const [blogs, setBlogs] = useState([{  }])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState([null, ''])
    const [user, setUser] = useState(null)
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })

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

    const createBlog = async (event) => {
        event.preventDefault()
        try {
            await blogService.create(newBlog)
            let updatedBlog = blogs.concat(newBlog)

            setBlogs(updatedBlog)
            setNewBlog({
                title: '',
                author: '',
                url: '',
            })
            setMessage(
                [`a new blog titled "${newBlog.title}" was created!`, 'notification'])
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

    const newBlogSetter = (event) => {
        const value = event.target.value
        setNewBlog({
            ...newBlog,
            [event.target.name]: value
        })
    }

    const messageTimeout = () => {
        setTimeout(() => {
            setMessage([null, ''])
        }, 5000)
    }
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
                    <BlogRender
                        blogs={blogs}
                        Blog={Blog}
                        user={user.name}
                        handleLogout={handleLogout}
                        setBlog={newBlogSetter}
                        newBlog={newBlog}
                        createBlog={createBlog}
                    />
                </div>
            }

        </div>
    )
}

export default App
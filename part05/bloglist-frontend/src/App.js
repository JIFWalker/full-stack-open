/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogRender from './components/BlogRender'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([{  }])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = async (event) => {
        try {
            window.localStorage.clear()
            blogService.setToken(null)
            setUser(null)
        } catch (error) {
            console.log(error)
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
        } catch (error) {
            console.log(error)
        }
    }

    const passwordSetter = (event) => {
        event.preventDefault()
        setPassword(event)
    }

    const usernameSetter = (event) => {
        event.preventDefault()
        setUsername(event)
    }

    const newBlogSetter = (event) => {
        const value = event.target.value
        setNewBlog({
            ...newBlog,
            [event.target.name]: value
        })
    }

    return (
        <div>
            {user === null
                ? <LoginForm
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                    setPassword={passwordSetter}
                    setUsername={usernameSetter}
                />
                :
                <BlogRender
                    blogs={blogs}
                    Blog={Blog}
                    user={user.name}
                    handleLogout={handleLogout}
                    setBlog={newBlogSetter}
                    newBlog={newBlog}
                    createBlog={createBlog}
                />
            }

        </div>
    )
}

export default App
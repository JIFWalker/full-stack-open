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
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'


const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())

    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)



    useEffect(async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = await JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

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
            dispatch(
                setNotification(
                    ['Login Succesful!', 'notification'], 10)
            )
        } catch (exception) {
            dispatch(
                setNotification(
                    [exception.toString(), 'error'], 10)
            )
        }
    }

    const handleLogout = (event) => {
        try {
            window.localStorage.clear()
            blogService.setToken(null)
            setUser(null)
        } catch (exception) {
            dispatch(
                setNotification(
                    [exception.toString(), 'error'], 10)
            )
        }
    }

    const updateLikes = (likedBlog) => {
        try {
            let blogIndex = blogs.findIndex(blog => blog.id === likedBlog.id),
                updatedBlogs = [...blogs]

            blogService
                .update(likedBlog)
                .then(updatedBlogs[blogIndex] = likedBlog)

            dispatch(
                setNotification(
                    [`${likedBlog.title} was liked!`, 'notification'], 10)
            )

        } catch (exception) {
            dispatch(
                setNotification(
                    [exception.toString(), 'error'], 10)
            )
        }
    }

    const removeBlog = (removedBlog) => {
        if (window.confirm(`Remove blog ${removedBlog.title} by ${removedBlog.author}?`) === true) {


            try {
                blogService
                    .remove(removedBlog.id)

                dispatch(
                    setNotification([`${removedBlog.title} was removed!`, 'notification'], 10)
                )
            } catch (exception) {
                dispatch(
                    setNotification(
                        [exception.toString(), 'error'], 5)
                )
            }
        }
    }

    const passwordSetter = (event) => {
        setPassword(event)
    }

    const usernameSetter = (event) => {
        setUsername(event)
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Toggleable buttonLabel='Add Blog' ref={blogFormRef}>
            <BlogForm/>
        </Toggleable>
    )

    return (
        <div>
            <h2>Blogs List</h2>
            <ShowMessage />
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
                        removeBlog={removeBlog}
                        user={user}
                    />
                </div>
            }

        </div>
    )
}

export default App
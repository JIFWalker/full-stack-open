/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router,
    Switch, Route, Link, withRouter
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/userListReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogRender from './components/BlogRender'
import LoginForm from './components/LoginForm'
import ShowMessage from './components/ShowMessage'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import UsersData from './components/UsersData'
import UserBlogs from './components/UserBlogs'




const App = () => {

    const padding = {
        padding: 5
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.userList)


    useEffect(async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            dispatch(initializeUser(loggedUserJSON))
        }
    }, [])

    const handleLogout = (event) => {
        try {
            window.localStorage.clear()
            blogService.setToken(null)
            dispatch(logout())
        } catch (exception) {
            dispatch(
                setNotification(
                    [exception.toString(), 'error'], 10)
            )
        }
    }

    const blogFormRef = useRef()

    const blogForm = () => (
        <Toggleable buttonLabel='Add Blog' ref={blogFormRef}>
            <BlogForm/>
        </Toggleable>
    )

    return (
        <Router>
            <div>
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to='/users'>Users</Link>
            </div>

            <div>
                <h2>Blogs List</h2>
                <ShowMessage />
                {user === null
                    ?
                    <div>
                        <h2>Log In To Application</h2>
                        <LoginForm />
                    </div>
                    :
                    <div>
                        <p>
                            {user.name} has logged in
                            <button onClick={handleLogout}>logout</button>
                        </p>
                        <Switch>
                            <Route path="/users/:id" >
                                <UserBlogs />
                            </Route>
                            <Route path="/users" >
                                <UsersData />
                            </Route>
                            <Route path="/">
                                <h2>Blogs</h2>
                                <div>{blogForm()}</div>
                                <BlogRender
                                    blogs={blogs}
                                    Blog={Blog}
                                    user={user}
                                />
                            </Route>
                        </Switch>
                    </div>
                }

            </div>
        </Router>
    )
}

export default App
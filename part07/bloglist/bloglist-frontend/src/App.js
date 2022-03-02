/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, useRouteMatch,
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

    const userMatch = useRouteMatch('/users/:id')
    const blogMatch = useRouteMatch('/blogs/:id')
    const userData = userMatch
        ? users.find(user => String(user.id) === String(userMatch.params.id))
        : null
    const blog = blogMatch
        ? blogs.find(blog => String(blog.id) === String(blogMatch.params.id))
        : null

    return (
        <div>
            <div>
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to='/users'>Users</Link>
                {user
                    ? <div style={padding}>
                        <em>{user.name} logged in</em>
                        <button onClick={handleLogout}>logout</button>
                    </div>
                    : <Link style={padding} to="/login">Login</Link>
                }
            </div>

            <div>
                <ShowMessage />
                {user === null
                    ?
                    <div>
                        <h2>Log In To Application</h2>
                        <LoginForm />
                    </div>
                    :
                    <Switch>
                        <Route path="/users/:id" >
                            <UserBlogs user={userData}/>
                        </Route>
                        <Route path="/users" >
                            <UsersData />
                        </Route>
                        <Route path="/blogs/:id" >
                            <Blog blog={blog} loggedUser={user} />
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

                }
            </div>
        </div>
    )
}

export default App
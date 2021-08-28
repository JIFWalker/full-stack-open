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

    useEffect(() => {
        blogService
            .getAll().then(initialBlogs => {
                setBlogs( initialBlogs )
            })
    }, [])

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

    const passwordSetter = (pass) => {
        setPassword(pass)
    }

    const usernameSetter = (name) => {
        setUsername(name)
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
                />
            }

        </div>
    )
}

export default App
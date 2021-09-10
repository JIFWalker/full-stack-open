/* eslint-disable react/prop-types */
import React from 'react'

const LoginForm = ({ handleLogin, username, password, setPassword, setUsername }) => (
    <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
            <div>
      username
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
      password
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    </div>
)

export default LoginForm


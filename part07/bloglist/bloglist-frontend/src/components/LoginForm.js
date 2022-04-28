import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch (login(username, password))
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
    return (
        <div>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.LabeL>Username</Form.LabeL>
                    <Form.Control
                        id="username"
                        type="text"
                        value={username}
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </Form.Group>
                <Button id="login-button" type="submit">login</Button>
            </Form>
        </div>
    )}

export default LoginForm


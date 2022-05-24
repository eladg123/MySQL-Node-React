import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import FormComponent from '../Components/FormComponent';
import { publicAPI } from '../api/api'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../Components/ErrorMessage';


const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const inputs = [<Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control style={{ width: 300 }} value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
    </Form.Group>, <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control style={{ width: 300 }} value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
    </Form.Group>, <Button variant='primary' onClick={async () => {
        const response = await publicAPI.post('/login', { username: username, password: password })
        if (!response.data.auth) {
            setErrMsg(response.data.message)
        } else {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('currentUser', JSON.stringify(response.data.currentUser))
            navigate('/home')
        }
    }} >Login</Button>


    ]

    return (
        <div>
            <h1>Login Screen</h1>
            <FormComponent inputs={inputs} />
            <ErrorMessage errMsg={errMsg} />
            <Link to='/signup'>Don't have user? Register now here</Link>

        </div>
    )
}

export default LoginScreen
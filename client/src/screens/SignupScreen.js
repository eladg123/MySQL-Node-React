import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import FormComponent from '../Components/FormComponent';
import { publicAPI } from '../api/api'
import { useNavigate } from 'react-router-dom'


const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const inputs = [<Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control style={{ width: 300 }} value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
    </Form.Group>, <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control style={{ width: 300 }} value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
    </Form.Group>,
    <Form.Group>
        <Form.Check
            type='checkbox'
            label={"Is Admin? "}
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)} />
    </Form.Group>,
    <Button variant='primary'
        onClick={async () => {
            const response = await publicAPI.post('/register', { username: username, password: password, isAdmin: isAdmin })
            if (response.data.message) {
                navigate('/')
            }
        }} >
        Signup</Button>
    ]

    return (
        <div>
            <h1>Register</h1>
            <FormComponent inputs={inputs} />
            <Link to='/'>Already have an account? Signin here</Link>
        </div>
    )
}

export default SignupScreen
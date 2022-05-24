import React from 'react'
import { Container } from 'react-bootstrap';
import Spacer from './Spacer'
import ErrorMessage from './ErrorMessage'

const FormComponent = ({ inputs, errMsg }) => {
    return (
        <Container>
            {inputs.map((input, i) => (
                <div key={i}>
                    {input}
                    <Spacer />
                </div>
            ))}
            <ErrorMessage errMsg={errMsg} />
        </Container>
    )
}

export default FormComponent
import React from 'react'

const ErrorMessage = ({ errMsg }) => {
    return (
        <div style={{ color: 'red' }}>{errMsg != '' && errMsg}</div>
    )
}

export default ErrorMessage
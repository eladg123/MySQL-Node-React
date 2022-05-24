import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import ErrorMessage from '../Components/ErrorMessage';
import { clearMessages, getUsersList, deleteUserById } from '../state/userActions'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);
    const actionCreators = { clearMessages, getUsersList, deleteUserById };
    const relevantFunctions = bindActionCreators(actionCreators, dispatch);
    let regularUsers = [];
    let admins = []
    useEffect(() => {
        relevantFunctions.clearMessages();
        relevantFunctions.getUsersList();
    }, [])
    if (usersState.users != []) {
        regularUsers = usersState.users.filter(user => user.isAdmin == false);
        admins = usersState.users.filter(user => user.isAdmin == true);

    }
    return (
        <div>
            <h1>Users</h1>
            <h2>Regular users list:</h2>
            <ul>{regularUsers.length > 0 &&
                regularUsers.map((user, i) => {
                    return (
                        <li key={i}>  ID: {user.id} , Username: {user.username}
                            <Button variant='danger' onClick={() => relevantFunctions.deleteUserById(user.id)}>Delete user</Button>
                        </li>
                    )
                })}</ul>
            <h2>Admins users list:</h2>
            <ul>
                {admins.length > 0 &&
                    admins.map((user, i) => {
                        return (
                            <li key={i}>ID: {user.id} , Username: {user.username}  <Button variant='danger' onClick={() => relevantFunctions.deleteUserById(user.id)}>Delete user</Button> </li>

                        )
                    })}
            </ul>
            <ErrorMessage errMsg={usersState.errMsg} />
        </div>
    )
}

export default HomeScreen
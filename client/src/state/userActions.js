import { authAPI, publicAPI } from '../api/api';




export const getUsersList = () => {
    return async (dispatch) => {
        try {
            const response = await authAPI.get('/users');
            if (response.status === 200) {
                dispatch({ type: 'get_users_list', payload: response.data });
            } else if (response.status >= 400 && response.status < 500) {
                dispatch({ type: 'add_error', payload: "Users not found..." })
            } else if (response.status >= 500) {
                dispatch({ type: 'add_error', payload: "Something went wrong, try again later" })
            }
        } catch (error) {
            dispatch({ type: 'add_error', payload: "Something went wrong, try again later" })

        }
    }
}

export const deleteUserById = (userId) => {
    return async (dispatch) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser.isAdmin) {
                const response = await authAPI.delete(`/delete/${userId}`);
                if (response.status === 200) {
                    dispatch({ type: 'delete_user_by_id', payload: userId });
                } else if (response.status >= 400 && response.status < 500) {
                    dispatch({ type: 'add_error', payload: "User to delete not found" })
                } else if (response.status >= 500) {
                    dispatch({ type: 'add_error', payload: "Something went wrong, try again later" })
                }
            } else {
                dispatch({ type: 'add_error', payload: "Only admins can delete users" })
            }
        } catch (error) {
            dispatch({ type: 'add_error', payload: "Something went wrong, try again later" })

        }
    }
}



export const clearMessages = () => {
    return (dispatch) => {
        dispatch({ type: 'clear_error' })
    }
}
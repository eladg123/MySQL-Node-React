

const initialState = { users: [], errMsg: '' }


export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'get_users_list':
            return { ...state, users: action.payload }
        case 'delete_user_by_id':
            return { ...state, users: state.users.filter((user) => user.id !== action.payload) }
        case 'add_error':
            return { ...state, errMsg: action.payload }
        case 'clear-error':
            return { ...state, errMsg: '' }
        default:
            return state;
    }
}
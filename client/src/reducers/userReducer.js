const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';
const LOGOUT = 'LOGOUT';
const REG_USER = 'REG_USER';

const defaultState = {
    currentUser: {},
    users: [],
    isAuth: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
                isAuth: true
            }
        case REG_USER:
        return {
            ...state,
            isAuth: true
        }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
            return state;
    }
}

export const setUser = user => ({type: SET_USER, payload: user});
export const regUser = () => ({type: SET_USER});
export const setUsers = users => ({type: SET_USERS, payload: users});
export const logout = () => ({type: LOGOUT});
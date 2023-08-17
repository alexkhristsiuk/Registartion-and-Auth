import axios from "axios";
import { setUser } from "../reducers/userReducer";

export const registration = async (username, email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            username,
            email,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }

}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
    
        } catch (e) {
            alert(e.response.data.message)
        }

    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`, 
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
    
        } catch (e) {
            alert(e.response.data.message);
            localStorage.removeItem('token');
        }

    }
}

export const deleteUser = async (userId) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/auth/delete/${userId}`, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(setUser(response.data.user));
            localStorage.removeItem('token');
            console.log(response.data.message);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };
};
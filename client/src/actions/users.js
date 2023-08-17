import axios from "axios";
import { setUsers } from "../reducers/userReducer";

export function getUsers() {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/all`,
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
            dispatch(setUsers(response.data));
        } catch(e) {
            alert(e.response.data.message)
        }
    }
}
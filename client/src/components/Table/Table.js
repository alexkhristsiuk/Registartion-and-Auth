import Table from 'react-bootstrap/Table';
import Toolbar from '../Toolbar/Toolbar';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { logout} from '../../reducers/userReducer';
import './table.css';

function UserTable({users}) {
    const [isChecked, setIsChecked] = useState(false);
    const [userCheckboxes, setUserCheckboxes] = useState(new Array(users.length).fill(false));
    const [newUsers, setNewUsers] = useState(users);
    const [selectedIndexes, setSelectedIndexes] = useState([]);

    const dispatch = useDispatch();

    function renderUsers(users, index) {

        return (
            <tr key={index}>
                <td><input 
                    type='checkbox' 
                    className='checkbox' 
                    value={users.id} 
                    checked={userCheckboxes[index]} 
                    onChange={()=>handleUserCheckbox(index)}/>
                </td>
                <td>{users._id}</td>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td>{new Date(users.registration).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                <td>{new Date(users.logindate).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                <td>{users.status}</td>
            </tr>
        )
    }
    
    function handleUserCheckbox(index) {
        const newSelectedIndexes = selectedIndexes.includes(index)
                                    ? selectedIndexes.filter(idx => idx !== index)
                                    : [...selectedIndexes, index];
        setSelectedIndexes(newSelectedIndexes);

        const newUserCheckboxes = [...userCheckboxes];
        newUserCheckboxes[index] = !newUserCheckboxes[index];
        setUserCheckboxes(newUserCheckboxes);
    }

    function handleAllCheckbox() {
        setIsChecked(!isChecked);
        const newCheckboxes = new Array(users.length).fill(!isChecked);
        setUserCheckboxes(newCheckboxes);
    }

    const onDeleteUser = () => {
        const updatedUsers = newUsers.filter((user, index) => !selectedIndexes.includes(index));
        setNewUsers(updatedUsers);
        setSelectedIndexes([]);
        setUserCheckboxes(new Array(updatedUsers.length).fill(false));
    }

    return (
        <>
            <h1 style={{textAlign:'center'}}><b>Users table:</b></h1>
            <button 
                className='btn btn-warning float-end btn-lg'
                onClick={() => dispatch(logout())}
            >
                Log out
            </button>
            <Toolbar onDeleteUser={onDeleteUser}/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <input 
                            type='checkbox' 
                            className='checkbox'
                            checked={isChecked}
                            onChange={handleAllCheckbox}/>
                        </th>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Registration date</th>
                        <th>Last login date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {newUsers.map(renderUsers)}
                </tbody>
            </Table>
        </>
    );
}

export default UserTable;
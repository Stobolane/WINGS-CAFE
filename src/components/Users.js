// src/components/Users.js
import React, { useState } from 'react';

function Users() {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleSaveUser = () => {
        const updatedUsers = [...users];
        if (editingIndex !== null) {
            updatedUsers[editingIndex] = newUser;
        } else {
            updatedUsers.push(newUser);
        }
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setNewUser({ username: '', email: '', password: '' });
        setEditingIndex(null);
    };

    const handleEdit = (index) => {
        setNewUser(users[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    return (
        <div className="user-management">
            <h1>Users</h1>
            <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}required/>
            <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}required/>
            <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}required/>
            <button onClick={handleSaveUser}>{editingIndex !== null ? 'Update' : 'Add'} User</button>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.username} - {user.email}
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;

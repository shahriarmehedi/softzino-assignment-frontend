import React, { useEffect, useState } from 'react';

const Users = () => {

    const [users, setUsers] = useState([]);

    // get users data from server useEffect
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        fetch('https://softzino-backend.herokuapp.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
    }

    return (
        <div className=''>
            <h3 className='text-3xl font-bold py-10 pl-10 text-left'>Users</h3>
            <table className=' w-[700px] border-separate table-auto ml-10'>
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className='text-left p-4'>Name</th>
                        <th className='text-left p-4'>Email</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className='p-4 text-left bg-gray-50'>{user.displayName}</td>
                            <td className='p-4 text-left bg-gray-50'>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
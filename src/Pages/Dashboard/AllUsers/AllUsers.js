import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import React from 'react';

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-two.vercel.app/users`);
            const data = await res.json();
            return data;
        }
    })

    const handelMakeAdmin = (user) => {

        const agree = window.confirm(`Are you sure you want to make ${user.name} an admin?`);

        if (agree) {
            fetch(`https://doctors-portal-server-two.vercel.app/users/admin/${user._id}`, {
                method: 'PUT',
                headers: {
                    authorization: `bearer ${localStorage.getItem('Access Token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount) {
                        toast.success('Make admin successfully');
                        refetch();
                    }
                })
        }
    }
    return (
        <div>
            <h3 className='text-3xl bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 font-bold text-center w-1/2 mx-auto my-5'>All Users</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>Email Address</th>
                            <th>Admin Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map((user, i) => {
                                return (
                                    <tr key={user._id}>
                                        <th>{i + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{
                                            user?.role ? <span className='badge badge-ghost'>Admin</span>
                                                :
                                                <button onClick={() => handelMakeAdmin(user)} className='btn btn-xs btn-primary'>Make admin</button>
                                        }</td>
                                        <td><button className='btn btn-xs btn-error'>delete</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
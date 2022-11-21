import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navber = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const menuItems = <>
        <li><NavLink
            className={({ isActive }) =>
                isActive ? 'bg-green-500 text-white rounded-xl' : ' text-emerald-500'
            }
            to='/home'>Home</NavLink></li>
        <li><NavLink
            className={({ isActive }) =>
                isActive ? 'bg-green-500 text-white rounded-xl' : ' text-emerald-500'
            }
            to='/appointment'>Appointment</NavLink></li>
        <li><NavLink
            className={({ isActive }) =>
                isActive ? 'bg-green-500 text-white rounded-xl' : ' text-emerald-500'
            }
            to='/about'>About</NavLink></li>
        <li><NavLink
            className={({ isActive }) =>
                isActive ? 'bg-green-500 text-white rounded-xl' : ' text-emerald-500'
            }
            to='/reviews'>Reviews</NavLink></li>
        {user?.uid ?
            <>
                <li><NavLink
                    className={({ isActive }) =>
                        isActive ? 'bg-green-500 text-white rounded-xl' : ' text-emerald-500'
                    }
                    to="/dashboard">Dashboard</NavLink></li>
                <li><button title={user?.displayName} className='text-emrald-500' onClick={handleLogOut}>Sign out</button></li>
            </>
            :
            <li><NavLink
                className={({ isActive }) =>
                    isActive ? 'bg-green-500 text-white rounded-xl' : ' text-emerald-500'
                }
                to='/login'>Login</NavLink></li>}
    </>
    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">

                <label htmlFor="Dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <Link to="/" className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Navber;
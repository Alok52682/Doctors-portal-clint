import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../Hooks/UseAdmin';
import Navber from '../Pages/Shared/Navber/Navber';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    return (
        <div>
            <Navber />
            <div className="drawer drawer-mobile">
                <input id="Dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="Dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><NavLink
                            className={({ isActive }) =>
                                isActive && 'bg-green-500 text-white'
                            }
                            to='/dashboard/myappointments'>My Appointments</NavLink></li>
                        {
                            isAdmin && <>
                                <li><NavLink
                                    className={({ isActive }) =>
                                        isActive ? 'bg-green-500 text-white' : ''
                                    }
                                    to='/dashboard/adddoctor'>Add Doctor</NavLink></li>
                                <li><NavLink
                                    className={({ isActive }) =>
                                        isActive ? 'bg-green-500 text-white' : ''
                                    }
                                    to='/dashboard/managedoctors'>Manage Doctors</NavLink></li>
                                <li><NavLink
                                    className={({ isActive }) =>
                                        isActive ? 'bg-green-500 text-white' : ''
                                    }
                                    to='/dashboard/allusers'>All Users</NavLink></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
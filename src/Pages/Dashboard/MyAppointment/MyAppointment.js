import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const url = `https://doctors-portal-server-two.vercel.app/bookings?email=${user?.email}`;
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('Access Token')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    return (
        <div className='px-10'>
            <h3 className='text-3xl bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 font-bold text-center w-1/2 mx-auto my-5'>My Appointments</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Patient Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings && bookings.map((booking, i) => {
                                return (
                                    <tr key={booking._id} className="hover">
                                        <th>{i + 1}</th>
                                        <td>{booking.patient}</td>
                                        <td>{booking.treatment}</td>
                                        <td>
                                            {booking.appointmentDate}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">{booking.slot}</span>
                                        </td>
                                        <td>
                                            {
                                                booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                                                    <button
                                                        className='btn btn-primary btn-sm'
                                                    >Pay</button>
                                                </Link>
                                            }
                                            {
                                                booking.price && booking.paid && <span className='badge badge-ghost'>Paid</span>
                                            }
                                        </td>
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

export default MyAppointment;
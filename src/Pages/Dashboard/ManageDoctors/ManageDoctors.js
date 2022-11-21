import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingdoctor] = useState(null);
    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://doctors-portal-server-two.vercel.app/doctors`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('Access Token')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (err) {

            }
        }
    })

    const closeModal = () => {
        setDeletingdoctor(null);
    }
    const handelDeletedoctor = (doctor) => {
        fetch(`https://doctors-portal-server-two.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('Access Token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    setDeletingdoctor(null);
                    toast.success('Doctor deleted');
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h3 className='text-3xl bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 font-bold text-center w-1/2 mx-auto my-5'>Manage Doctor : {doctors?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avater</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) => {
                                return (
                                    <tr key={doctor._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-12 border rounded-full">
                                                    <img src={doctor.drPhoto} alt='' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.speciality}</td>
                                        <td>
                                            <label onClick={() => setDeletingdoctor(doctor)} htmlFor="confirmation-modal" className='btn btn-xs btn-error'>Remove</label>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to remove ${deletingDoctor.name}?`}
                    massage="If you remove it cannot be recover"
                    closeModal={closeModal}
                    successAction={handelDeletedoctor}
                    modalData={deletingDoctor}
                />
            }
        </div>
    );
};

export default ManageDoctors;
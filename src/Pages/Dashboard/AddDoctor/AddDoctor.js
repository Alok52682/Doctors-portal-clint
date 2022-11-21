import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const { data: specialities = [], isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-two.vercel.app/appointmentspeciality`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handleAddDoctor = data => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        drPhoto: imgData.data.url
                    }
                    fetch('https://doctors-portal-server-two.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('Access Token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                navigate('/dashboard/managedoctors')
                                toast.success('Doctor added successfully');
                            }
                        })
                }
            })
    }
    return (
        <div>
            <h3 className='text-3xl bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 font-bold text-center w-1/2 mx-auto my-5'>Add Doctor</h3>
            <div className='w-96 p-7 mx-auto border rounded-xl'>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Speciality</span></label>
                        <select {...register("speciality")} className="select select-bordered w-full max-w-xs">
                            {
                                specialities?.map(speciality => <option key={speciality._id} value={speciality.name}>{speciality.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo</span></label>
                        <input type="file" {...register("img", {
                            required: "Photo is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
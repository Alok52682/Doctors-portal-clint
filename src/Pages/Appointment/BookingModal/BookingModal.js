import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import PrimaryButton from '../../../Components/PrimaryButton';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    // treatment is just another name of appointmentOptions with name, slots, _id
    const { name, slots, price } = treatment;
    const { user } = useContext(AuthContext);
    const date = format(selectedDate, 'PP');
    // console.log(treatment);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const patient = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // [3, 4, 5].map((value, i) => console.log(value))
        const booking = {
            appointmentDate: date,
            treatment: name,
            patient,
            slot,
            email,
            phone,
            price
        }

        // TODO: send data to the server
        // and once data is saved then close the modal 
        // and display success toast
        fetch('https://doctors-portal-server-two.vercel.app/bookings', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        }).then(res => res.json()).then(data => {
            if (data.acknowledged) {
                setTreatment(null);
                toast.success('Appointment request granted');
                refetch();
            }
            else {
                toast.error(data.message);
                setTreatment(null);
            }
        })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle btn-ghost font-extrabold absolute right-2 top-2 text-primary">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={date} className="input w-full input-bordered " />
                        <select name="slot" className="select select-bordered w-full">
                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }
                        </select>
                        <input name="name" type="text" placeholder="Patient Name" className="input w-full input-bordered" required />
                        <input name="email" type="email" defaultValue={user?.email} disabled className="input w-full input-bordered" />
                        <input name="phone" type="number" placeholder="Phone Number" className="input w-full input-bordered  appearance-none" required />
                        <br />
                        {/* <input className='btn btn-accent w-full' type="submit" value="Submit" /> */}
                        <PrimaryButton type="submit">Submit</PrimaryButton>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;
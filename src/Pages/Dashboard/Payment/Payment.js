import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import Loading from '../../Shared/Loading/Loading';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();
    const { treatment, price, appointmentDate, slot } = booking;
    if (navigation.state === "loading") {
        return <Loading />
    }
    return (
        <div>
            <h3 className='text-3xl'>Payment for <span className='text-green-400 font-semibold'>{treatment}</span></h3>
            <p className='text-xl'>Please pay {price} for your appointment at {slot} on {appointmentDate}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
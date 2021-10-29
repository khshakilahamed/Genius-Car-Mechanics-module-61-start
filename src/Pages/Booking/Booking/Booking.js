import React, { useState } from 'react';
import { useParams } from 'react-router';

const Booking = () => {
    const [service, setService] = useState({});
    const { serviceId } = useParams();

    fetch(`http://localhost:5000/services/${serviceId}`)
        .then(res => res.json())
        .then(data => setService(data))

    return (
        <div>
            <h2>Booking Id: {serviceId}</h2>
            <h3>Service name: {service.name}</h3>
            <img src={service.img} alt="" />
        </div>
    );
};

export default Booking;
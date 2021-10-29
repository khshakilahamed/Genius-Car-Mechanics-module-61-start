import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './UpdateService.css';

const UpdateService = () => {
    const [service, setService] = useState({});
    const { serviceId } = useParams();

    // console.log(serviceId);

    useEffect(() => {
        fetch(`http://localhost:5000/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, []);


    const handleServiceNameChange = e => {
        const updateServiceName = e.target.value;
        console.log(updateServiceName);
        const updateService = { name: updateServiceName, description: service.description, price: service.price, img: service.img };
        setService(updateService);
    }

    const handleDescriptionChange = e => {
        const updateDescription = e.target.value;
        console.log(updateDescription);
        const updateService = { name: service.name, description: updateDescription, price: service.price, img: service.img };
        setService(updateService);
    }

    const handlePriceChange = e => {
        const updatePrice = e.target.value;
        console.log(updatePrice);
        const updateService = { name: service.name, description: service.description, price: updatePrice, img: service.img };
        setService(updateService);
    }

    const handleImageChange = e => {
        const updateImage = e.target.value;
        console.log(updateImage);
        const updateService = { name: service.name, description: service.description, price: service.price, img: updateImage };
        setService(updateService);
    }

    const handleUpdateSubmit = e => {
        const proceed = window.confirm("Are you sure, you want to update?");

        if (proceed) {
            fetch(`http://localhost:5000/services/${serviceId}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(service)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        alert("Service Updated!");
                        setService({});
                    }
                    // console.log(data);
                })
        }

        e.preventDefault();
    }

    return (
        <div className="update-service">
            <h2>Please, Update your Service</h2>

            <form onSubmit={handleUpdateSubmit}>
                <input type="text" onChange={handleServiceNameChange} value={service.name} />
                <textarea type="text" onChange={handleDescriptionChange} value={service.description} />
                <input type="text" onChange={handlePriceChange} value={service.price} />
                <input type="text" onChange={handleImageChange} value={service.img} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateService;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/services")
            .then(res => res.json())
            .then(data => setServices(data))
    }, []);


    const handleDeleteService = id => {
        // console.log(id);
        const proceed = window.confirm("Are you sure, you want to delete the service?");
        if (proceed) {
            fetch(`http://localhost:5000/services/${id}`, {
                method: 'delete',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Successfully deleted");
                        // console.log(data);
                        const remainingServices = services.filter(service => service._id !== id)
                        setServices(remainingServices);
                    }
                })
        }

    };

    return (
        <div>
            <h2>Manage Services</h2>
            {
                services.map(service => <div key={service._id}>
                    <h4>{service.name}</h4>
                    <Link to={`/manageServices/update/${service._id}`}>
                        <button>Update</button>
                    </Link>
                    <button onClick={() => handleDeleteService(service._id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageServices;
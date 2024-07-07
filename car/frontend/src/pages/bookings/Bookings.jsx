import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import BookingRow from './BookingRow';
import axios from 'axios';
const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:4000/getbookings?email=${user.email}`;

    useEffect(() => {
        axios.get(url,{withCredentials:true})
            .then(res =>{
                setBookings(res.data)
            })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => setBookings(data));
    }, [url]);

    const handleDelete = (id) => {
       
     
            fetch(`http://localhost:4000/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted successfully');
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                });
        
    };
const handleUpdate = (id)=>{
fetch(`http://localhost:4000/updatebookings/${id}`,{
    method:'PATCH',
    headers:{
        'content-type':'application.json'
    },
    body:JSON.stringify({status:'çonfirm'})
})
.then(res=>res.json())
.then(data=>{
    console.log(data)
    if (data.modifiedCount > 0) {
        alert('Updated successfully');
        const remaining = bookings.filter(booking => booking._id !== id);
        const updated = bookings.find(booking => booking._id === id)
        updated.status ='confirm'
        const newBookings=[updated,...remaining]
        setBookings(newBookings)
  
    }
})
}
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bookings;

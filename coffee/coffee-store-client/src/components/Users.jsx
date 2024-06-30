import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const Users = () => {
    const getLoader = useLoaderData()
    const [users,setUsers]=useState(getLoader)

    const handleDelete = (id)=>{
fetch(`http://localhost:5000/deleteusers/${id}`,{
    method:'DELETE',

}).then(res=>res.json()).then(data =>{
    if(data.deletedCount > 0){
        console.log('deleted successfully')
        const remainuser = users.filter(user=>user._id!==id)
        setUsers(remainuser)
    }
})
    }
    return (
        <>
            <div className="overflow-x-auto">
                <h2>{getLoader.length}</h2>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Password</th>
                               <th>last loggedin</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td><button onClick={()=>handleDelete(user._id)} className='btn'>X</button></td>
                                <td><button onClick={()=>handleDelete(user._id)} className='btn'>update</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users

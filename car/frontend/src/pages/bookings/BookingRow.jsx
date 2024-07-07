import React from 'react'

const BookingRow = ({ booking ,handleDelete,handleUpdate}) => {
    const {_id, name, email, date, img, title, amount,status } = booking;

   
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-32 w-32">
                            <img
                                src={img}
                                alt="Avatar"
                                className='h-96 w-96'
                            />
                        </div>
                    </div>
                  
                </div>
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{title}</td>
            <td>{amount}</td>
            <td>{date}</td>
            <th>
            <button 
            onClick={()=>handleDelete(_id)}
            className="btn btn-circle">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
            </th>
            <th>
                {
                    status ==='confirm'?<span>confirmed</span>:            <button 
                    onClick={()=>handleUpdate(_id)}
                    className="btn ">
          update
        </button>
                }

            </th>
        </tr>
    );
}

export default BookingRow;

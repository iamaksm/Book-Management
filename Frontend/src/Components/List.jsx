import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate,Link } from 'react-router-dom'
export default function List() {
    const [books,setbooks] = useState([])
    const API_URL = 'http://localhost:3001/books'
    const navigate = useNavigate()

   const handleDelete = async (id) => {
  try {
    

    await axios.delete(`${API_URL}/${id}`);
    setbooks(books.filter((book) => book._id !== id));
    console.log("Deleted:", id);
  } catch (err) {
    console.error("Error deleting book:", err);
  }
};

    useEffect(()=>{
        axios
          .get(API_URL)
          .then(res => setbooks(res.data))
    },[])
  return (
    <>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
            </tr>
        </thead>

        <tbody>
            {books.map((book)=>(
                <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                     <td> <Link to={`/update/${book._id}`} className='btn btn-warning btn-sm me-3'> edit</Link> 
             <button onClick={()=>{
              handleDelete(book._id)
             }}
              className='btn btn-danger btn-sm'> delete </button> </td>
                </tr>

            ))}
        </tbody>
        </table></>
  )
}

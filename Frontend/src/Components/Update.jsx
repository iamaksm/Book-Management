
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate,  useParams } from 'react-router-dom'

export default function Update() {
const navigate = useNavigate()
  const [formData, setformData] = useState({
    title:"",
    author:"",
    year:""
  })
  const API_URL= "https://book-management-1-al1j.onrender.com/books";
  const {id} = useParams()

  useEffect(()=>{

    axios.get(`${API_URL}/${id}`)
    .then(res=>setformData(res.data))
  },[id])
  const handleSubmit = async(e)=>{
     e.preventDefault()
     await axios.put(`${API_URL}/${id}`,formData)
     navigate("/")
  }

  return (

    
    <div className='card p-3 shadow'>
      <h3>Update</h3>

      <form onSubmit={handleSubmit}>

        Title: <input type="text"  placeholder='Enter title name' required className='form-control mb-2' onChange={e=>{setformData({...formData,title:e.target.value})}} value={formData.title}/><br /><br />
        Author: <input type="text" placeholder='Enter Author name' required className='form-control mb-2' value={formData.author} onChange={e=>{setformData({...formData,author:e.target.value})}}/><br /><br />
        Year: <input type="text" placeholder='enter year' required className='form-control mb-2' onChange={e=>{setformData({...formData,year:e.target.value})}} value={formData.year}/><br /><br />
        <button className='btn btn-primary'>Update</button>
      </form>
    </div>
  )
}

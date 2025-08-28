
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Add() {

  const [formData, setformData] = useState({
    title:"",
    author:"",
    year:""
  })
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
      e.preventDefault()
      await axios.post('https://book-management-1-al1j.onrender.com/books',formData)

      alert("Book added Successfully")
      navigate("/")
  }

  return (

    
    <div className='card p-3 shadow'>
      <h3>Add a New Book</h3>

      <form onSubmit={handleSubmit}>

        Title: <input type="text"  placeholder='Enter title name' required className='form-control mb-2' onChange={e=>{setformData({...formData,title:e.target.value})}} value={formData.title}/><br /><br />
        Author: <input type="text" placeholder='Enter Author name' required className='form-control mb-2' value={formData.author} onChange={e=>{setformData({...formData,author:e.target.value})}}/><br /><br />
        Year: <input type="text" placeholder='enter year' required className='form-control mb-2' onChange={e=>{setformData({...formData,year:e.target.value})}} value={formData.year}/><br /><br />
        <button className='btn btn-primary'>Add</button>
      </form>
    </div>
  )
}

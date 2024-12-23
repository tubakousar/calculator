
// use simple form  

import React, { useEffect, useState } from "react";

function Userform() {
    const [formData ,setFormData] =useState({
        name:"",
        email:"",
        password:""
    });
    const [saveddata ,setSaveddata] =useState([]);
    const [editdata ,setEditdata] =useState(null);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("data"))|| [];
        setSaveddata(data)
    },[])

    const handleChange=(e)=>{
        const {name ,value} = e.target;
        setFormData(prevdata=>({
            ...prevdata,
            [name] : value
        }))
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(editdata !== null){
            const updatedata = saveddata.map((item , index)=>
                index === editdata ? formData : item
            
            )
            setSaveddata(updatedata);
            setEditdata(null);
            localStorage.setItem("data" , JSON.stringify(updatedata));

        }else{
            const userdata = [...saveddata , formData];
        setSaveddata(userdata);
        localStorage.setItem("data" , JSON.stringify(userdata));

        }
        
        setFormData({
            name:"",
            email:"",
            password:""
        });
        console.log(formData);
    }
    const handledelete=(index)=>{
        const previous = saveddata.filter((_,i)=>i !== index);
        setSaveddata(previous)
        localStorage.setItem("data" , JSON.stringify(previous));

    }
    const handleEdit=(index)=>{
        setEditdata(index)
        setFormData(saveddata[index])

    }





  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">{editdata !== null ? "save changes" : "Submit"}</button>
      </form>
      {saveddata.map( (list,index)=>(
        <div key={index}>
            <p>{list.name}</p>
            <p>{list.email}</p>
            <p>{list.password}</p>
            <button onClick={()=>handledelete(index)}>delete</button>
            <button onClick={()=>handleEdit(index)}>edit</button>
        </div>
      ))}
    </div>
  );
}

export default Userform;


import React, { useState } from "react";
import  axios  from 'axios';
//const axios= require('axios')
const url=" http://localhost:3001/feedback"

const Feedback =() =>{

    const [postImage,setPostImage]=useState({myfile:""})

    const createPost=async(newImage)=>{
        try{
            await axios.post(url,newImage)   

        }catch(error){
            console.log(error)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        createPost(postImage)
        console.log("Uploaded")
    }

    const handleFileUpload= async(e)=>{
        const file=e.target.files[0];
        const base64=await convertToBase64(file);
        setPostImage({...postImage,myfile:base64})

    }

    return (
        <div className="text-white">
            <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload">
                    <img src="" alt=""/>
                </label>
                <input
                    type="file"
                    label="Image"
                    name="myFile"
                    id='file-upload'
                    accept='.jpeg,.png,.jpg'
                    onChange={(e)=>handleFileUpload(e)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Feedback;

function convertToBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader= new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        };
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
}
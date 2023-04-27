import React, { useState } from "react";
import avatar from '../../assets/images/profile.png'
import  axios  from 'axios';
//const axios= require('axios')
const url=" http://localhost:3001/feedback"

function Feedback() {

    const [postImage, setPostImage]=useState({myfile:""})

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
        //console.log(base64)
        setPostImage({...postImage,myfile:base64})

    }

    return (
        <div className="text-white flex justify-center">
            <form onSubmit={handleSubmit} >
                <label htmlFor="file-upload">
                    <img src={postImage.myfile} alt=""/>
                </label>
                <input
                    type="file"
                    label="Image"
                    name="myFile"
                    id='file-upload'
                    accept='.jpeg,.png,.jpg'
                    onChange={(e)=>handleFileUpload(e)}
                />
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
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
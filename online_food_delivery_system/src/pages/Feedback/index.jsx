import React, { useState } from "react";
import avatar from '../../assets/images/profile.png'
import  axios  from 'axios';
//const axios= require('axios')
const url=" http://localhost:3001/feedback"



function Feedback() {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [postImage, setPostImage]=useState({myfile:""})

    const createPost=async(postData)=>{
        try{
            //await axios.post(url,newImage)
            await axios.post(url, postData);
            
        }catch(error){
            console.log(error)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const postData = {
            name,
            review,
            myfile: postImage.myfile,
          };
        createPost(postData);
        console.log("Uploaded")
    }

    const handleFileUpload= async(e)=>{
        const file=e.target.files[0];
        const base64=await convertToBase64(file);
        //console.log(base64)
        setPostImage({...postImage,myfile:base64})

    }

    return (
        <div className="text-black flex justify-center">
             
        
            <form onSubmit={handleSubmit} >
            <h1 className="text-2xl font-bold mb-6 text-center">Feedback form</h1>
            
            <input className="e-input" type="text" placeholder="Enter Name" />
                <label htmlFor="file-upload">
                    <img src={postImage.myfile} alt=""/>
                </label>
                
                <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>

                <input
                    type="file"
                    label="Image"
                    name="myFile"
                    id='file-upload'
                    accept='.jpeg,.png,.jpg'
                    onChange={(e)=>handleFileUpload(e)}
                />
                <button type="submit feedback" className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg">Submit</button>
            </form>
        </div>
    )
}


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

export default Feedback;
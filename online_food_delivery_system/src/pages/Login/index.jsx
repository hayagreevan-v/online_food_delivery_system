import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/Button";
import { app } from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {
  getDatabase,
  set,
  ref,
  update,
} from "firebase/database"
const LoginPage =() => {
  let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        const authentication = getAuth();
        const database = getDatabase(app);
        let uid = '';
        signInWithEmailAndPassword(authentication, data.email, data.password)
            .then((response) => {
                uid = response.user.uid;
                sessionStorage.setItem('User Id', uid);
                sessionStorage.setItem('Auth token', response._tokenResponse.refreshToken)
                window.dispatchEvent(new Event("storage"))
                setLoading(false);
                var lgDate = new Date();
          update(ref(database, "users/" + uid), {
            last_login: lgDate,
          })
            .then(() => {
              // Data saved successfully!
              alert("LoggedIn Successfully");
            })
            .catch((error) => {
              // The write failed...
              alert(error);
            });
                toast.success('Successful Login!🎉', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                    });
                navigate('/');
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    toast.error('Wrong Password')
                }
                if (error.code === 'auth/user-not-found') {
                    toast.error('Email not found, please registe')
                }
                setLoading(false);
            })
    
    }

  return (
<body className="bg-gray-900 text-white">
<div className="flex justify-center">
  <form className="bg-gray-800 p-10 rounded-lg">
    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
    <div className="mb-4">
      <label htmlFor="email" className="block mb-2">Username</label>
      <input {...register('email')} type="email" id="email" name="email" className="w-full px-3 py-2  rounded-md bg-wheat-700 focus:outline-none focus:bg-orange-250 text-black font-bold" />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block mb-2">Password</label>
      <input {...register('password')}type="password" id="password" name="password" className="w-full px-3 py-2  rounded-md bg-wheat-700 focus:outline-none focus:bg-orange-250 text-black font-bold" />
    </div>
    <button type="submit" className="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Login</button>
  </form>
  <ToastContainer />
</div>
</body>

  )
}

export default LoginPage;

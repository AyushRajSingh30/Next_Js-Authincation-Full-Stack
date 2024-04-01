"use client"; //we used react states that time we need to inteoduce this


import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function SignupPage() {
    const router=useRouter()
    const [user, setUser]= useState({
        email:"",
        password:"",
        username:"",
    })
  
    const [buttonDisables, setButtonDisabled]= useState(false);
    const [loading, setLoading] = useState(false);
    
    const onSignup= async()=>{
        try {
            setLoading(true);
            // Axios allows you to send various types of HTTP requests such as GET, POST, PUT, DELETE, etc.,
            //We use user to gather the information entered by the user in the form. When the user submits the form, this data is sent to the server.
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");    //automaticaly go to login page.

        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message); //toast show pop error  message
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);    
    

  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
 <h1>{loading ? "Processing": "Signup"}</h1>
 <hr />
 <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})} //spread userdats ...user.
            placeholder="username"
            />
   <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button 
            onClick={onSignup}
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
                {
                    buttonDisables?"No Signup": "Signup"
                }
            </button>

           <Link href="/login">Visit Login Page</Link>


    </div>
  )
}

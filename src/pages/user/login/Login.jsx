
import axios from "axios";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { UserContext } from "../../../usercontext";
import{ Bounce, toast } from 'react-toastify';
import style from "./Login.module.css";

export default function Login() {
  const {setIsLogin,setUserData} =useContext(UserContext);
  const[errormessage,seterrormessage]=useState("");
  const navigate=useNavigate();
 const schema = yup.object({
email:yup.string().required().min(5).max(40).email(),
password:yup.string().required().min(5).max(20),


 });




const formik=useFormik({
initialValues:{
email:'',
password:''
},
onSubmit:LoginUser,
validationSchema:schema

});
 async function LoginUser(){
try{
   const {data}=await axios.post('https://ecommerce-node4.onrender.com/auth/signin',formik.values);
   console.log(data);
   if(data.message=='success'){
    console.log(data.token);
    localStorage.setItem("userToken",data.token)
    setIsLogin(true);
    const decoded = jwtDecode(data.token);
    setUserData(decoded);
    toast('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    navigate('/')
   }
   }
   catch(error){
    toast.error('🦄 error.response.data.message', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
   }
  
}

  return (
    <div className='container '>
   <div className= {`${style.cs}`}>

    <h1>Login</h1>
    
      {errormessage?<div className="alert alert-danger">{errormessage}</div>:null}
    
    <form onSubmit={formik.handleSubmit}>
  
  <div className="form-floating mb-3">
    <input type="email" className="form-control" 
     onChange={formik.handleChange}
     name="email"
     id="email" 
     value={formik.email}
     onBlur={formik.handleBlur}
     />
    <label htmlFor="email">Email</label>
    { formik.touched.email && formik.errors.email? <div className="alert alert-danger">{formik.errors.email}</div>:null}

    {formik.errors.email}
  </div>



  <div className="form-floating mb-3">
    <input type="password" className="form-control" 
     onChange={formik.handleChange}
     name="password"
     id="password" 
     value={formik.password}
          onBlur={formik.handleBlur}

     />
    <label htmlFor="pass">Password</label>
    {formik.touched.password && formik.errors.password? <div className="alert alert-danger">{formik.errors.password}</div>:null}

  </div>

<button type='submit' className='btn btn-outline-info'> Login </button>

</form>
</div>
    </div>
  )
}


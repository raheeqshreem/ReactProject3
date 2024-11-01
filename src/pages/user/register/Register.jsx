import axios from "axios";
import { useFormik } from "formik"
import style from "./register.module.css";

export default function Register() {

const formik=useFormik({
initialValues:{
userName:'',
email:'',
password:''
},
onSubmit:RegisterUser


});
 async function RegisterUser(){
   const {data}=await axios.post('https://ecommerce-node4.onrender.com/auth/signup',formik.values);
   console.log(data);
}

  return (
    <div className='container '>
         <div className= {`${style.cs}`}>

    <h1>Register</h1>
    <form onSubmit={formik.handleSubmit}>
  <div className="form-floating mb-3">
    <input type="text" className="form-control" 
    onChange={formik.handleChange}
    name="userName"
    id="name" 
    value={formik.userName}
    />
    <label htmlFor="name">User Name</label>
  </div>

  <div className="form-floating mb-3">
    <input type="email" className="form-control" 
     onChange={formik.handleChange}
     name="email"
     id="email" 
     value={formik.email}
     />
    <label htmlFor="email">Email</label>
  </div>



  <div className="form-floating mb-3">
    <input type="password" className="form-control" 
     onChange={formik.handleChange}
     name="password"
     id="password" 
     value={formik.password}
     />
    <label htmlFor="pass">Password</label>
  </div>

<button type='submit' className='btn btn-outline-info'> Register </button>

</form>

    </div>
    </div>
  )
}

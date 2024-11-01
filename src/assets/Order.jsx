
import React, {  useContext, useEffect, useState } from 'react';
import axios from 'axios';
import style from "./Order.module.css";
import { useFormik } from 'formik';
import { Bounce, toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';


export default function Order() {
const [orders, setOrders] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState(null);

const {cartItems,setCartItems,getCartCount} =useContext(CartContext);

const setCartCount =async ()=>{
  setCartItems(await getCartCount())
 
}
useEffect(()=>{
  setCartCount()
} , [])

const formik=useFormik({
    initialValues:{
       
        couponName:'',
        address:'',
        phone:'',
    },
     onSubmit:fetchOrders
        
})


async function fetchOrders(){
    try {

   const token = localStorage.getItem("userToken");


const {data} = await axios.post("https://ecommerce-node4.onrender.com/order",
    {
couponName:"",
address:formik.values.address,
phone:formik.values.phone,

    }
   , {
      headers: {
        Authorization: `Tariq__${token}`,
      },
  }) 
console.log(data);
 
if(data.message=="success"){
  toast.success('🦄 Product is Added successfully', {
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
    setCartItems(0);
}

}catch(err) {

setError(err.message);


} finally {

setLoading(false);

}

};


//if (loading) return <div>جاري تحميل الطلبات...</div>;




return (
  
<div className='container'>
<div className={`${style.formp}`}>
<h1>Orders</h1>


{ error && <div className='text-danger fw-bold'>حدث خطأ: {error}</div>}

    <form onSubmit={formik.handleSubmit}>
  
  <div className="form-floating mb-3">
    <input type="Text" className="form-control" 
     onChange={formik.handleChange}
 name='address' value={formik.address} />
    <label htmlFor="Address"> Address </label>
   
  </div>



  <div className="form-floating mb-3">
    <input type="integer" className="form-control" onChange={formik.handleChange}
 name='phone' value={formik.phone} />
    <label htmlFor="num">Phone </label>
   
  </div>
  <div className="form-floating mb-3">
    <input type="integer" className="form-control" onChange={formik.handleChange}
 name='couponName' value={formik.couponName} />
    <label htmlFor="Num">couponName</label>
   
  </div>

  <button type='submit' className='btn btn-outline-info' > Send </button>


</form>

</div>
</div>
)
};





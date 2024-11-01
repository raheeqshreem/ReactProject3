

    import axios from "axios";
    import React, { useContext, useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
//import useFetchData from "../../../customHooks/useFetchData";
import style from './Product.module.css'
import useFetchData from "../../../customHooks/useFetchData";
import { Bounce, toast } from "react-toastify";
import Navbar from "../../../component/user/navbar/Navbar";
import { CartContext } from "../../../context/CartContext";



    export default function Product() {
   

      const { productId } = useParams();
    
      const{data,loding,error}=useFetchData(`https://ecommerce-node4.onrender.com/products/${productId}`);
      const {cartItems,setCartItems,getCartCount} =useContext(CartContext);

      const setCartCount =async ()=>{
        setCartItems(await getCartCount())
       
      }
      useEffect(()=>{
        setCartCount()
      } , [])
    
      if(loding){
         return  <div className={`${style.lod}`}>
         <div className="spinner-border" role="status">
         <span className="visually-hidden">Loading...</span>
       </div>
       </div>
      }
      if(error){
      return <div className='alert-dander'>{error}</div>
      }

const addToCart =async(productId)=>{
const token=localStorage.getItem('userToken');
console.log(token)

try{
const res =await axios .post(`https://ecommerce-node4.onrender.com/cart/`,
    {productId:productId},
{
    headers:{
      Authorization:`Tariq__${token}`
}

})

if(res.data.message=="success"){
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
    setCartItems(prev => prev+1) ;

}   


}
catch(error){
    toast.error('🦄 The Product Was Previously Added  To The Cart', {
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
  
    <div className='container py-5'>

<section className="product">
  <div className={`${style.title}`}>
  
<h1> {data.product.name } </h1>
<p> {data.product.description} </p>
<div className={`${style.poe}`}>
<h2> Price  : {data.product.price} $</h2>
</div>
<div className={`${style.photo}`}>
    {data.product.subImages.map(img=> 
    <img src={img.secure_url} /> 

    )}  

         </div>
         
    </div>

<button className="btn btn-success" onClick={()=>addToCart(productId)}>Add To Cart</button> 

</section>

</div>

        
  )
}

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import Navbar from "../../../component/user/navbar/Navbar";
import { Link } from "react-router-dom";
import { CartContext } from '../../../context/CartContext';



export default function Cart() {
  const [cart, setCart] = useState({});
  const [changeCart, setChangCart] = useState(0);
  const [loding, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const {setCartItems} =useContext(CartContext)

   const getCart = async () => {
    try{
        const token = localStorage.getItem('userToken');
    
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/cart/`, {
          headers: {
            Authorization: `Tariq__${token}`
          }
    
        })
        console.log(data);
        setCart(data);
      }
    catch(err) {

      setError(err.message);
      
      
      } finally {
      
      setLoading(false);
      
      }
    }
  const increaseQty = async (prodId) => {
    
    const token = localStorage.getItem("userToken");
    const { data } = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
      { productId: prodId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setChangCart((prev)=> prev+1) 
    setCartItems(prev => prev+1)}  ;

  const decreseQty = async (prodId, proQuantity) => {
    if (proQuantity == 1) return;
    const token = localStorage.getItem("userToken");
    const { data } = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
      { productId: prodId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setChangCart((prev) => prev - 1);
    setCartItems(prev => prev-1);
  };
  const RemoveItem =async(ProId)=>{
      const token=localStorage.getItem('userToken');
      console.log(ProId)
      const {data}= await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`,
        { "productId": ProId},
        {
          
           headers:{
          Authorization:`Tariq__${token}`
          }
        }
      )
     console.log(data)
     setChangCart((prev)=> prev-1)
    
     setCartItems(prev => prev-1)
     };

  const RemoveAllItems = async () => {
    const token = localStorage.getItem("userToken");

    const { data } = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/clear`,
      {},
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setChangCart([]);
  };

  useEffect(() => {
    getCart();
  }, [changeCart]);

console.log(cart)
  if (loding) {
    return (
      <div className={`${style.lod}`}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="alert-dander">{error}</div>;
  }
  if(cart.count !==0){
  
  return (
    <>
      <div className="container mt-5 pt-5">
        <h1>Cart</h1>
       
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product </th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
            </tr>
          </thead>
          <tbody>
          

            {cart?.products?.map((pro) => (           
 

              <tr key={pro.productId}>
                <td>{pro.details.name.substring(0, 10)}...</td>
                <td>
                  {" "}
                  <img
                    src={pro.details.mainImage.secure_url}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{pro.details.finalPrice}$</td>
                <td>
                  <span
                    onClick={() => increaseQty(pro.details._id)}
                    className="p-1 border rounded bg-primary text-white fw-bolder"
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </span>
                  <span className="p-1">{pro.quantity}</span>
                  <span
                    onClick={() => decreseQty(pro.details._id, pro.quantity)}
                    className="py-1 px-2 border rounded bg-primary text-white"
                    style={{ cursor: "pointer" }}
                  >
                    -
                  </span>
                </td>
                <td>
                  <i
                    className="fa-solid fa-trash-can"
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => RemoveItem(pro.details._id)}
                  ></i>
                </td>
              
              
        </tr> 


     ) )}

          <div className={`${style.rem}`}>
         
          Clear Cart <i className="fa-solid fa-trash-can"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => RemoveAllItems()}
          ></i>
        
</div> 

               
            
          </tbody>
        </table>
        
        
        <Link
                        className="btn btn-outline-primary"
                        to={`/order`}
                      >
                        Order Now
                      </Link>


    

         
      </div>

      
    </>
  )}  
  return;
  
 
}




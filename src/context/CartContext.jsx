import axios from "axios";
import { createContext, useEffect, useState } from "react";
//import Loader from "../component/loader/Loader";


export const CartContext = createContext()

const CartContextProvider = ({children})=>{
    const [cartItems, setCartItems] = useState(0)

    const getCartCount = async () => {
        const token = localStorage.getItem('userToken');
    
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/cart/`, {
          headers: {
            Authorization: `Tariq__${token}`
          }
    
        })

    //    setLoader(false)
       return(data.count)
     
       
      };

     
   
    return (
        <CartContext.Provider value={{cartItems , getCartCount , setCartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
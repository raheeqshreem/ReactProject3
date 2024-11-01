import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../usercontext";
import style from "./Navbar.module.css";
import Cart from "../../../pages/user/cart/Cart";
import axios from "axios";
import {  CartContext } from "../../../context/CartContext";
//import Loader from "../../loader/Loader";

export default function Navbar() {
  //const [loader ,setLoader] =useState(true)
  const { IsLogin, UserData, setUserData, setIsLogin } =
    useContext(UserContext);
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("userToken");
    setIsLogin(false);
    setUserData({});
    navigate("/login");
  }
  // const getCartCount = async () => {
  //   const token = localStorage.getItem('userToken');

  //   const { data } = await axios.get(`https://ecommerce-node4.onrender.com/cart/`, {
  //     headers: {
  //       Authorization: `Tariq__${token}`
  //     }

  //   })
  //   console.log(data)
  //   setCount(data.count)
 
   
  // };

  const {cartItems,setCartItems,getCartCount} =useContext(CartContext)

  const setCartCount =async ()=>{
    setCartItems(await getCartCount())
   // setLoader(false)
  }
  //fixed-top
  useEffect(()=>{
    // getCart()
    setCartCount()
  } , [])

  //if(loader) return <Loader/>
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          T Shop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {IsLogin ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/Profile"}
                  >
                    Welcome {UserData.userName}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={handleLogOut}
                  >
                    Logout
                  </a>
                </li>
                <li>
                  <div className={`${style.icon}`}>
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/Cart"}
                    >
                      <i class="fa-solid fa-cart-shopping"></i>
                    
                 
                  <div
                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      color: "white",
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  >
                           {cartItems}
                  </div>
                  </Link>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to={"/login"}>
                    Login
                  </Link>
                </li>
                {
                  <li className="nav-item">
                    <Link className="nav-link active" to={"/register"}>
                      Register
                    </Link>
                  </li>
                }
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

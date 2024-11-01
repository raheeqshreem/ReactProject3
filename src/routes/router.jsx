import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/user/home/Home";
import Login from "../pages/user/login/Login";
import Register from "../pages/user/register/Register";
import CategoryDetails from "../pages/user/CategoryDetails/CategoryDetails";
import Product from "../pages/user/Product/Product";
import Profile from "../pages/user/profile/Profile";
import Cart from "../pages/user/cart/Cart";
import Order from "../assets/Order";

const router = createBrowserRouter([
{
path:'/',
element:<Root />,
children: [
    {
    path:'/',
    element:<Home/>
},
{
    path:'/login',
    element:<Login/>  
},
{
    path:'/register',
    element:<Register/>
},
{
  path:'/categoryDetails/:categoryId',
  element:<CategoryDetails/>

},
{

    path:'/product/:productId',
    element:<Product/>

},

{

    path:'/register',
    element:<Register/>

},
{

    path:'/profile',
    element:<Profile/>
}
 
,
{
    path:'/cart',
    element:<Cart/>
    
},
{
path:'/order',
element:<Order/>

}

]
}
]);
export default router;
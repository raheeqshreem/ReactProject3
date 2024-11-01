import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import UserContextProvider from "./usercontext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContextProvider from "./context/CartContext";


export default function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>

        <RouterProvider router={router} />
        <ToastContainer />
      </CartContextProvider>

    </UserContextProvider>
  )
}

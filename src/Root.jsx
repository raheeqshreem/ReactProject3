import { Outlet } from "react-router-dom";
import Footer from "./component/user/footer/Footer";
import Navbar from "./component/user/navbar/Navbar";

export default function Root() {
  return (
    <>
    
    <Navbar />
    <Outlet />
    <Footer />
    
    </>
  )
}

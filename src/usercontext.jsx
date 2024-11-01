import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
 export const UserContext =createContext();

const UserContextProvider = ({children})=>{
    const [IsLogin,setIsLogin]=useState(localStorage.getItem("userToken")? true:false);
    const [UserData,setUserData]=useState({});
    useEffect( ()=>{
        const token = localStorage.getItem("userToken");
        if(token){
          setIsLogin(true);
          const decoded=jwtDecode(token);
        setUserData(decoded);
        
        }
          },[]);
  
return <UserContext.Provider value ={{IsLogin,setIsLogin,UserData,setUserData}}>
 {children} 
</UserContext.Provider>;
}

export default UserContextProvider;
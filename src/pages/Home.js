import React from "react";
import Sidebar from "./Sidebar/sidebar";
import { Outlet } from "react-router-dom";
import Widgets from "./Widgets/widget";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Home = () => {
  const User = useAuthState(auth)
    //  console.log(User[0]?.email)
  
 const handleLogOut = () =>{
     signOut(auth)
 }
    return (
        <div className="app"> 
            <Sidebar handleLogOut={handleLogOut} User={User} />
             <Outlet />
            <Widgets />
        </div>

    );

};

export default Home;
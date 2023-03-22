import "./dashboard.css";
import { Link, useResolvedPath } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import UserOrders from "../../components/UserOrders/UserOrders";
import Profile from "../Profile/Profile";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppState } from "../../Store/store";


const Dashboard = () => {
  const navigate = useNavigate();
  const next = useLocation().pathname
  const { auth,setAuth } = AppState();
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const currPath = useResolvedPath().pathname;
  const sidebarLinks = [
    {
      path: "/dashboard/profile",
      title: "Profile",
    },
    {
      path: "/dashboard/orders",
      title: "My Orders",
    },
    
    {
      path: "#",
      title: "Logout",
    },
  ];
  useEffect(()=>{
    console.log(next);
    if(localStorage.getItem("auth")){
        setAuthData(JSON.parse(localStorage.getItem("auth"))?.user)
    }   
    else{
        navigate('/login?next='+next)
    }
  
},[auth])
  return (
    <>
      <Navbar />
      <div className="profile py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ProfileSidebar sidebarLinks={sidebarLinks} />
            </div>
            <div className="col-md-9">
              {currPath === "/dashboard/orders" ? (
                <UserOrders />
              ) : currPath === "/dashboard/profile" ? (
                <Profile authData={authData} setAuthData={setAuthData} auth={auth} setAuth={setAuth}/>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

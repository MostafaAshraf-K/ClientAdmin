import React from "react";
import "./topbar.css";
import { BsBell, BsGlobe, BsGear } from "react-icons/bs";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { Outlet } from "react-router";
// import { logout } from "../../redux/userRedux";
// import { logout } from "../redux/userSlice";
import userImg from "../assets/149071.png";
export default function Topbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
  };

  return (
    <>
      <div className="topbar  ">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">EasyShop</span>
          </div>
          <div className="topRight">
            <Button onClick={handleLogout}>Logout</Button>
            <div className="topbarIconContainer">
              <BsBell />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <BsGlobe />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <BsGear />
            </div>
            <Image src={userImg} alt="" className="topAvatar" />
          </div>
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
}

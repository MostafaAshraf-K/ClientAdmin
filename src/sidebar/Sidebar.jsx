import "./sidebar.css";
import {
  BsGrid3X3,
  BsFillBarChartFill,
  BsFillEnvelopeFill,
  BsChatDots,
  BsBriefcaseFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { Link, Outlet, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";

export default function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <Nav className="flex-column sidebarList">
              <Link
                to="/"
                className={`sidebarLink ${activeLink === "/" ? "active" : ""}`}
              >
                <Nav.Item className="sidebarListItem">
                  <BsGrid3X3 className="sidebarIcon" />
                  Home
                </Nav.Item>
              </Link>
              <Nav.Item className="sidebarListItem">
                <BsFillBarChartFill className="sidebarIcon" />
                Analytics
              </Nav.Item>
              <Nav.Item className="sidebarListItem">
                <BsGrid3X3 className="sidebarIcon" />
                Sales
              </Nav.Item>
            </Nav>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <Nav className="flex-column sidebarList">
              <Link
                to="/users"
                className={`sidebarLink ${
                  activeLink === "/users" ? "active" : ""
                }`}
              >
                <Nav.Item className="sidebarListItem">
                  <BsFillPeopleFill className="sidebarIcon" />
                  Users
                </Nav.Item>
              </Link>
              <Link
                to="/products"
                className={`sidebarLink ${
                  activeLink === "/products" ? "active" : ""
                }`}
              >
                <Nav.Item className="sidebarListItem">
                  <AiOutlineShoppingCart className="sidebarIcon" />
                  Products
                </Nav.Item>
              </Link>
              <Nav.Item className="sidebarListItem">
                <BsFillEnvelopeFill className="sidebarIcon" />
                Transactions
              </Nav.Item>
              <Nav.Item className="sidebarListItem">
                <BsFillBarChartFill className="sidebarIcon" />
                Reports
              </Nav.Item>
              <Link
                to="/orders"
                className={`sidebarLink ${
                  activeLink === "/orders" ? "active" : ""
                }`}
              >
                <Nav.Item className="sidebarListItem">
                  <BsFillEnvelopeFill className="sidebarIcon" />
                  Orders
                </Nav.Item>
              </Link>
              <Link
                to="/newproduct"
                className={`sidebarLink ${
                  activeLink === "/newproduct" ? "active" : ""
                }`}
              >
                <Nav.Item className="sidebarListItem">
                  <BsCartPlus className="sidebarIcon" />
                  Add product
                </Nav.Item>
              </Link>
            </Nav>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <Nav className="flex-column sidebarList">
              <Nav.Item className="sidebarListItem">
                <BsFillEnvelopeFill className="sidebarIcon" />
                Mail
              </Nav.Item>
              <Nav.Item className="sidebarListItem">
                <BsChatDots className="sidebarIcon" />
                Feedback
              </Nav.Item>
              <Nav.Item className="sidebarListItem">
                <BsChatDots className="sidebarIcon" />
                Messages
              </Nav.Item>
            </Nav>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <Nav className="flex-column sidebarList">
              <Nav.Item className="sidebarListItem">
                <BsBriefcaseFill className="sidebarIcon" />
                Manage
              </Nav.Item>
              <Nav.Item className="sidebarListItem">
                <BsFillBarChartFill className="sidebarIcon" />
                Analytics
              </Nav.Item>
              <Nav.Item className="sidebarListItem">
                <BsFillPeopleFill className="sidebarIcon" />
                Reports
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

import React from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import music from "../../assets/music (1).png";
import notification_icon from "../../assets/notification.png";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  const sidebar_toggle = (e) => {
    setSidebar((prev) => (prev === false ? true : false));
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          src={menu_icon}
          alt=""
          className="menu-icon"
          onClick={sidebar_toggle}
        />
        <Link to="/">
          {" "}
          <img src={logo} alt="" className="logo" />
        </Link>
        <Link to="/">
          <h3 className="branding">YouTube</h3>
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />

          <img className="search_icon" src={search_icon} alt="" />
        </div>
        <div className="mike">
          <img className="" src={music} alt="" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <Link to="/login">
          <button>Sign in</button>
        </Link>
        <img src={notification_icon} alt="" />
        <img src={user} alt="" className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;

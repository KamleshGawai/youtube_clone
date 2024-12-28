import React, { useState, useContext } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import music from "../../assets/music (1).png";
import notification_icon from "../../assets/notification.png";
import userIcon from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Navbar = ({ setSidebar }) => {
  const { user, setUser } = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const sidebarToggle = () => {
    setSidebar((prev) => !prev);
  };

  const handleViewChannel = () => {
    navigate("/channel");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setDropdownVisible(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src={menu_icon}
          alt="Menu"
          className="menu-icon"
          onClick={sidebarToggle}
        />
        <Link to="/" className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h3 className="branding">YouTube</h3>
        </Link>
      </div>

      <div className="nav-middle">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <img className="search-icon" src={search_icon} alt="Search" />
        </div>
        <div className="mic-container">
          <img src={music} alt="Microphone" />
        </div>
      </div>

      <div className="nav-right">
        {!user ? (
          <Link to="/login">
            <button className="sign-in-button">Sign in</button>
          </Link>
        ) : (
          <div className="user-section">
            <img
              src={notification_icon}
              alt="Notifications"
              className="notification-icon"
            />
            <img
              src={userIcon}
              alt="User"
              className="user-icon"
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>ID: {user._id}</p>
                <button onClick={handleViewChannel}>View Your Channel</button>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

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
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          src={menu_icon}
          alt="Menu"
          className="menu-icon"
          onClick={sidebarToggle}
        />
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Link to="/">
          <h3 className="branding">YouTube</h3>
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img className="search_icon" src={search_icon} alt="Search" />
        </div>
        <div className="mike">
          <img className="" src={music} alt="Microphone" />
        </div>
      </div>

      <div className="nav-right flex-div">
        {!user ? (
          <Link to="/login">
            <button>Sign in</button>
          </Link>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

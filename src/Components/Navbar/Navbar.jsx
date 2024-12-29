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

<<<<<<< HEAD
 
  
=======
  const handleViewChannel = () => {
    navigate("/channel");
  };
>>>>>>> 36121eac5121d02dfec71884f0fce3413fc40e5e

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
<<<<<<< HEAD
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Link to="/">
=======
        <Link to="/" className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
>>>>>>> 36121eac5121d02dfec71884f0fce3413fc40e5e
          <h3 className="branding">YouTube</h3>
        </Link>
      </div>

      <div className="nav-middle">
        <div className="search-box">
          <input type="text" placeholder="Search" />
<<<<<<< HEAD
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
=======
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
>>>>>>> 36121eac5121d02dfec71884f0fce3413fc40e5e
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
<<<<<<< HEAD
                <a href="/src/Pages/Channel/Channel.html"><button>View Your Channel</button></a>
=======
                <button onClick={handleViewChannel}>View Your Channel</button>
>>>>>>> 36121eac5121d02dfec71884f0fce3413fc40e5e
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
<<<<<<< HEAD
          </>
=======
          </div>
>>>>>>> 36121eac5121d02dfec71884f0fce3413fc40e5e
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar"; // Import Sidebar
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { UserProvider } from "./contexts/UserContext"; // Import UserProvider
<<<<<<< HEAD
import VideoPage from './Pages/VideoPlayer/VideoPage';

=======
>>>>>>> 36121eac5121d02dfec71884f0fce3413fc40e5e

const App = () => {
  const [sidebar, setSidebar] = useState(true); // State for Sidebar toggle
  const [category, setCategory] = useState(0); // State for active category
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <UserProvider> {/* Wrap App with UserProvider */}
      <div className="app">
        <Navbar setSidebar={setSidebar} />
        <div className={`main-content ${!isLoginPage && sidebar ? 'with-sidebar' : 'no-sidebar'}`}>
          {!isLoginPage && (
            <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
          )}
          <Routes>
            <Route path="/" element={<Home sidebar={sidebar} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
<<<<<<< HEAD
            <Route path="/video/:videoId" element={<VideoPage />} />
            
=======
>>>>>>> 36121eac5121d02dfec71884f0fce3413fc40e5e
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
};

export default App;

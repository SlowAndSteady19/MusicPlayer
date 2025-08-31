import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const handleLogout = () => {
  localStorage.removeItem("loggedIn");
  window.location.href = "/login";
};

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>☰</button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
       
        {isOpen  && (
          <div className="sidebar-content">
          <Link to="/">Home</Link>
          <Link to="/feed">Feed</Link>
          <Link to="/albums">Albums</Link>
          <Link to="/charts">Charts</Link>
          <button onClick={handleThemeToggle}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </>
  );
}

export default SideBar;
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import Feed from "./pages/Feed";
import Charts from "./pages/Charts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar";
import SpotifyCharts from "./pages/SpotifyCharts";
import SongPlayer from "./pages/SongPlayer";
import "./App.css";

const ProtectedRoute = ({ element }) => {
  return localStorage.getItem("loggedIn") === "true" ? element : <Login />;
};

function AppWrapper() {
  const location = useLocation();
  const hideSidebarRoutes = ["/login", "/signup"];
  const shouldShowSidebar =
    localStorage.getItem("loggedIn") === "true" &&
    !hideSidebarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/albums" element={<ProtectedRoute element={<Albums />} />} />
        <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
        <Route path="/charts" element={<ProtectedRoute element={<SpotifyCharts />} />} />
        <Route path="/song/:id" element={<ProtectedRoute element={<SongPlayer />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

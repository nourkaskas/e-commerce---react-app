import { Link, Routes, Route, useNavigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import React, { useState } from "react";

function App() {
  const { userEmail, logout } = useAuthStore();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState(
    JSON.parse(localStorage.getItem("userPosts")) || []
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleAddPost = (post) => {
    const updated = [post, ...userPosts];
    setUserPosts(updated);
    localStorage.setItem("userPosts", JSON.stringify(updated));
  };

  return (
    <div className="w-full min-h-screen bg-color5">
      <nav className="p-4 flex justify-between bg-color2 font-serif">
        <Link to="/" className="font-bold text-xl text-color4">
          📰 Blog
        </Link>

        <div className="space-x-4">
          {userEmail && (
            <span className="text-white font-serif">👤{userEmail}</span>
          )}
          <Link
            to="/profile"
            className="hover:text-color5 transition duration-200 font-serif text-color5"
          >
            👤 profile
          </Link>
          <Link to="/favorites" className="text-white font-serif">
            ⭐ Favorites
          </Link>
          {userEmail ? (
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-color4">
              Login
            </Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={<CreatePost onAddPost={handleAddPost} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

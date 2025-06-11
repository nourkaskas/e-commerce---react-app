// src/pages/Profile.jsx
import useAuthStore from "../store/authStore";
import useFavoriteStore from "../store/favoriteStore";
import { useEffect, useState } from "react";

function Profile() {
  const { userEmail, logout } = useAuthStore();
  const { favorites } = useFavoriteStore();
  const [userCommentsCount, setUserCommentsCount] = useState(0);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("userComments")) || [];
    setUserCommentsCount(storedPosts.length);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="max-w-md mx-auto p-6 font-serif bg-[#fdf6e3] rounded-2xl shadow mt-12">
      <h1 className="text-2xl font-bold mb-4 text-color2">👤 profile </h1>
      <p className="mb-2">
        📧 email: <strong>{userEmail}</strong>
      </p>
      <p className="mb-2">
        ⭐ artical favorites : <strong>{favorites.length}</strong>
      </p>
      <p className="mb-6">
        💬 comments : <strong>{userCommentsCount}</strong>
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl w-full"
      >
        logout
      </button>
    </div>
  );
}

export default Profile;

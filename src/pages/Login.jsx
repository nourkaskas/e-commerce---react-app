// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Login() {
  const [email, setEmail] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#fdf6e3]">
      <form
        onSubmit={handleSubmit}
        className="bg-color5 p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center font-serif text-color2">
          Login
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-color3 text-white w-full py-2 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

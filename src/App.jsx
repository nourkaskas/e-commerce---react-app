import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#fdf6e3]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;

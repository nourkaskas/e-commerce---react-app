import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General");
  const navigate = useNavigate();

  const { userEmail } = useAuthStore();
  const addPost = usePostStore((state) => state.addPost);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      body,
      category,
      author: userEmail || "You",
    };

    addPost(newPost);
    const existing = JSON.parse(localStorage.getItem("userPosts")) || [];
    localStorage.setItem("userPosts", JSON.stringify([newPost, ...existing]));
    navigate("/");
    refetch();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold text-color2 font-serif">
        Create New Post
      </h2>

      <input
        className="w-full border p-2 rounded-2xl"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 rounded-2xl"
        placeholder="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <select
        className="w-full border p-2 rounded-2xl"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="General">General</option>
        <option value="Tech">Tech</option>
        <option value="Health">Health</option>
      </select>

      <button
        className="bg-color2 text-white px-4 py-2 font-serif rounded-2xl"
        type="submit"
      >
        Publish
      </button>
    </form>
  );
}

export default CreatePost;

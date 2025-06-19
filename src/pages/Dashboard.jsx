import React from "react";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useFavoriteStore from "../store/favoriteStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { userEmail } = useAuthStore();
  const posts = usePostStore((state) => state.posts);
  const removePost = usePostStore((state) => state.removePost);
  const favorites = useFavoriteStore((state) => state.favorites);

  const userPosts = posts.filter((post) => post.author === userEmail);

  const categoryData = Object.values(
    userPosts.reduce((acc, post) => {
      const category = post.category || "General";
      acc[category] = acc[category] || { category, count: 0 };
      acc[category].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <p className="text-lg">My Articles</p>
          <p className="text-2xl font-bold">{userPosts.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-lg">Favorites</p>
          <p className="text-2xl font-bold">{favorites.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-lg">My Comments</p>
          <p className="text-2xl font-bold">0</p>{" "}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">My Articles</h2>
      <ul className="space-y-4">
        {userPosts.map((post) => (
          <li key={post.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p>{post.body}</p>
            <p className="text-sm text-gray-500">
              Category: {post.category || "General"}
            </p>
            <div className="mt-2 flex gap-4">
              <Link to={`/edit/${post.id}`} className="text-blue-500 underline">
                Edit
              </Link>
              <button
                onClick={() => removePost(post.id)}
                className="text-red-500 underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-4">
        Post Distribution by Category:
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

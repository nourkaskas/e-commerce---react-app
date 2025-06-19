// ... باقي الاستيرادات
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import usePostStore from "../store/postStore";

export default function Home() {
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterAuthor, setFilterAuthor] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  useEffect(() => {
    const loadData = async () => {
      try {
        const postsRes = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const usersRes = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        const usersMap = {};
        usersRes.data.forEach((user) => {
          usersMap[user.id] = {
            name: user.name,
            email: user.email,
            company: user.company.name,
          };
        });

        const enrichedPosts = postsRes.data.map((post) => ({
          ...post,
          author: usersMap[post.userId]?.name || "unknown",
          category: "General", // يمكنك تعديل هذا لاحقًا
        }));

        const localPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

        setPosts([...localPosts, ...enrichedPosts]);
      } catch (err) {
        console.error(err);
        setError("An error occurred while loading articles.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setPosts]);

  if (loading) return <p className="text-center mt-0">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // توليد خيارات التصفية
  const categories = [
    "All",
    ...new Set(posts.map((p) => p.category || "General")),
  ];
  const authors = ["All", ...new Set(posts.map((p) => p.author))];

  // فلترة وفرز
  let filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "All" || post.category === filterCategory) &&
      (filterAuthor === "All" || post.author === filterAuthor)
  );

  if (sortBy === "Newest") {
    filteredPosts.sort((a, b) => b.id - a.id);
  } else if (sortBy === "Oldest") {
    filteredPosts.sort((a, b) => a.id - b.id);
  } else if (sortBy === "Alphabetical") {
    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="w-full md:w-[90%] lg:w-[85%]">
      <div className="relative text-white py-6 mb-5 w-full">
        <h1 className="relative z-10 text-4xl font-bold font-serif text-center ml-40">
          Articles
        </h1>
        <svg
          className="absolute top-0 left-0 w-screen rotate-180 z-0"
          viewBox="0 0 1440 250"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#393E46"
            fillOpacity="1"
            d="M0,224L48,224C96,224,192,224,288,213.3C384,203,480,181,576,160C672,139,768,117,864,133.3C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 w-screen px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 mt-16">
          <input
            type="text"
            placeholder="Search articles..."
            className="border rounded-xl px-4 py-2 bg-slate-50 shadow-inner col-span-12 md:col-span-6 lg:col-span-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border rounded-xl px-4 py-2 bg-slate-50 shadow-inner col-span-12 md:col-span-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* الكاتب */}
          <select
            className="border rounded-xl px-4 py-2 bg-slate-50 shadow-inner col-span-12 md:col-span-2"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
          >
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          {/* الفرز */}
          <select
            className="border rounded-xl px-4 py-2 bg-slate-50 shadow-inner col-span-12 md:col-span-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-4">
            <Link to="/dashboard" className="text-blue-500 underline">
              Go to Dashboard
            </Link>

            <Link to="/create" className="text-green-500 underline">
              Create New Post
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredPosts.length === 0 ? (
            <p className="text-center text-color1 col-span-full">
              There are no matching articles.
            </p>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                author={post.author}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

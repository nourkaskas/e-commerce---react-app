import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        }));

        setPosts(enrichedPosts);
      } catch (err) {
        console.error(err);
        setError("An error occurred while loading articles.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center mt-0">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

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

      <div className=" relative z-10 w-screen px-6 md:px-12 lg:px-24">
        <input
          type="text"
          placeholder="Search articles..."
          className="border rounded-xl px-4 py-2 mb-4 w-full mt-10 bg-slate-50 shadow-inner mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
          {posts.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 ? (
            <p className="text-center text-color1 col-span-full">
              There are no matching articles.
            </p>
          ) : (
            posts
              .filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((post) => (
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

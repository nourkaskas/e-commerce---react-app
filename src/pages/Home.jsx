import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          author: usersMap[post.userId]?.name || "مجهول",
        }));

        setPosts(enrichedPosts);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل المقالات.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center mt-0">جاري التحميل...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className=" w-full md:w-[90%] lg:w-[85%]  ">
      <div className="relative text-white py-12 mb-10 w-full">
        <h1 className="relative z-10 text-4xl font-bold font-serif text-center ml-40">
          Articles
        </h1>
        <svg
          className="absolute top-0 left-0 w-screen rotate-180 "
          viewBox="0 0 1440 270"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#393E46"
            fillOpacity="1"
            d="M0,224L48,224C96,224,192,224,288,213.3C384,203,480,181,576,160C672,139,768,117,864,133.3C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="w-screen px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 ">
          {posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="bg-[#fdf6e3] text-[#333] font-serif shadow-md border-[#e0d6c1] p-4 my-4 rounded-2xl relative overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#d4c8ac] to-transparent rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#d4c8ac] to-transparent rounded-2xl"></div>

                <h2 className="text-xl font-bold mb-2 font-serif text-color2">
                  {post.title} :
                </h2>
                <p className="mb-2 font-serif">
                  {post.body.split(" ").slice(0, 20).join(" ")}...
                </p>
                <p className="text-sm text-red-300 outline-double">
                  ✒️ author: {post.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

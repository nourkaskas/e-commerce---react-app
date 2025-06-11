// src/pages/Favorites.jsx
import useFavoriteStore from "../store/favoriteStore";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useFavoriteStore();

  return (
    <div className="p-6 font-serif">
      <h1 className="text-3xl font-bold mb-4 text-color2">⭐ Favorite Posts</h1>
      {favorites.length === 0 ? (
        <p>لا توجد مقالات مفضلة.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="bg-[#fdf6e3] p-4 border rounded-2xl shadow hover:shadow-lg">
                <h2 className="font-bold text-xl mb-2">{post.title}</h2>
                <p>{post.body.slice(0, 60)}...</p>
                <p className="text-sm text-red-300 mt-2">
                  ✒️ author: {post.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

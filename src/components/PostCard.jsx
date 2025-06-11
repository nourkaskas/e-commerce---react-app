import { useNavigate } from "react-router-dom";
import useFavoriteStore from "../store/favoriteStore";

function PostCard({ id, title, body, author }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFav = favorites.some((post) => post.id === id);

  const handleStarClick = (e) => {
    e.stopPropagation();
    toggleFavorite({ id, title, body, author });
  };

  return (
    <div
      className="bg-[#fdf6e3] text-[#333] font-serif shadow-md border-[#e0d6c1] p-4 my-4 rounded-2xl relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/post/${id}`)}
    >
      <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#d4c8ac] to-transparent rounded-2xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#d4c8ac] to-transparent rounded-2xl"></div>

      <button
        className="absolute top-2 right-2 text-xl  text-yellow-500"
        onClick={handleStarClick}
      >
        {isFav ? "⭐" : "☆"}
      </button>
      <h2 className="text-xl font-bold mb-2 text-color2 ">{title}</h2>
      <p className="text-gray-700 mb-2 font-serif">
        {body.split(" ").slice(0, 25).join(" ")}...
      </p>
      <p className="text-sm text-red-300 outline-double"> ✒️ By {author}</p>
    </div>
  );
}

export default PostCard;

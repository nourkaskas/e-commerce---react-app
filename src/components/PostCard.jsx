import { useNavigate } from "react-router-dom";

function PostCard({ id, title, body, author }) {
  const navigate = useNavigate();
  return (
    <div
      className="border p-2 rounded shadow hover:bg-gray-100 cursor-pointer"
      onClick={() => navigate(`/post/${id}`)}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">
        {body.split(" ").slice(0, 25).join(" ")}...
      </p>
      <p className="text-sm text-blue-600">By {author}</p>
    </div>
  );
}

export default PostCard;

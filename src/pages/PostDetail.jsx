import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, fetchPosts, fetchUser } from "../api/api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const postRes = await fetchPosts();
        const postItem = postRes.data.find((p) => p.id === parseInt(id));
        setPost(postItem);

        const userRes = await fetchUser(postItem.userId);
        setAuthor(userRes.data);

        const commentsRes = await fetchComments(id);
        setComments(commentsRes.data);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل تفاصيل المقال.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleAddComment = (newComment) => {
    const commentWithId = {
      ...newComment,
      id: Date.now(),
      isUserComment: true,
    };
    setComments([...comments, commentWithId]);
  };
  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (id, newBody) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, body: newBody } : comment
      )
    );
  };

  if (loading) return <p className="text-center">جاري التحميل...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="w-screen px-6 md:px-12 lg:px-24 py-8">
      <h1 className="text-2xl font-bold mb-2 font-serif text-color2 underline">
        {post.title} :
      </h1>
      <p className="mb-4 font-medium">Description: {post.body}</p>
      <p className="text-sm text-red-300 mb-2 underline">
        By : 👱🏻‍♂️ {author.name}- ✉️ ({author.email}) - 🏢 {author.company.name}
      </p>
      <hr className="my-8" />
      <CommentList
        comments={comments}
        onDelete={handleDeleteComment}
        onEdit={handleEditComment}
      />
      <CommentForm onAdd={handleAddComment} />
    </div>
  );
}

export default PostDetail;

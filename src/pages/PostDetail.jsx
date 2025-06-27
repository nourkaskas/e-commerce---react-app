import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComments, fetchPosts, fetchUser } from "../api/api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import useAuthStore from "../store/authStore";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userEmail } = useAuthStore();

  const [postLikes, setPostLikes] = useState(() => {
    return JSON.parse(localStorage.getItem("postLikes")) || {};
  });

  const [commentLikes, setCommentLikes] = useState(() => {
    return JSON.parse(localStorage.getItem("commentLikes")) || {};
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const postRes = await fetchPosts();
        const postItem = postRes.data.find((p) => p.id === parseInt(id));
        setPost(postItem);

        const userRes = await fetchUser(postItem.userId);
        setAuthor(userRes.data);

        const commentsRes = await fetchComments(id);
        const localComments =
          JSON.parse(localStorage.getItem("userComments")) || [];

        const mergedComments = [...commentsRes.data, ...localComments].filter(
          (c) => parseInt(c.postId) === parseInt(id)
        );

        setComments(mergedComments);
      } catch (err) {
        setError("An error occurred while loading the article details.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const togglePostLike = (postId) => {
    const updatedLikes = {
      ...postLikes,
      [postId]: !postLikes[postId],
    };
    setPostLikes(updatedLikes);
    localStorage.setItem("postLikes", JSON.stringify(updatedLikes));
  };

  const toggleCommentLike = (commentId) => {
    const currentCount = commentLikes[commentId] || 0;

    const updatedLikes = {
      ...commentLikes,
      [commentId]: currentCount === 1 ? 0 : 1,
    };
    setCommentLikes(updatedLikes);
    localStorage.setItem("commentLikes", JSON.stringify(updatedLikes));
  };

  const handleAddComment = (newComment) => {
    const commentWithId = {
      ...newComment,
      id: Date.now(),
      isUserComment: true,
      postId: id,
      parentId: newComment.parentId || null,
    };

    setComments([...comments, commentWithId]);

    const existingComments =
      JSON.parse(localStorage.getItem("userComments")) || [];
    const updatedComments = [...existingComments, commentWithId];
    localStorage.setItem("userComments", JSON.stringify(updatedComments));
  };

  const handleDeleteComment = (commentId) => {
    const updated = comments.filter((comment) => comment.id !== commentId);
    setComments(updated);
    const saved = JSON.parse(localStorage.getItem("userComments")) || [];
    localStorage.setItem(
      "userComments",
      JSON.stringify(saved.filter((c) => c.id !== commentId))
    );

    const updatedCommentLikes = { ...commentLikes };
    delete updatedCommentLikes[commentId];
    setCommentLikes(updatedCommentLikes);
    localStorage.setItem("commentLikes", JSON.stringify(updatedCommentLikes));
  };

  const handleEditComment = (id, newBody) => {
    const updated = comments.map((comment) =>
      comment.id === id ? { ...comment, body: newBody } : comment
    );
    setComments(updated);
    const saved = JSON.parse(localStorage.getItem("userComments")) || [];
    const updatedSaved = saved.map((comment) =>
      comment.id === id ? { ...comment, body: newBody } : comment
    );
    localStorage.setItem("userComments", JSON.stringify(updatedSaved));
  };

  if (loading) return <p className="text-center">Loading...</p>;
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

      <div className="my-4">
        <button
          onClick={() => togglePostLike(post.id)}
          className={`px-4 py-2 rounded ${
            postLikes[post.id] ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          👍 {postLikes[post.id] ? "Liked" : "Like"}
        </button>
      </div>

      <hr className="my-8" />

      <CommentList
        comments={comments}
        onDelete={handleDeleteComment}
        onEdit={handleEditComment}
        onAdd={handleAddComment}
        onLike={toggleCommentLike}
        commentLikes={commentLikes}
      />

      {userEmail ? (
        <CommentForm onAdd={handleAddComment} />
      ) : (
        <p className="text-sm text-red-500 mt-4">
          You must be logged in to post a comment.
        </p>
      )}
    </div>
  );
}

export default PostDetail;

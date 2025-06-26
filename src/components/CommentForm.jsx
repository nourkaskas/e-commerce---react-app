import { useState } from "react";

function CommentForm({ onAdd, parentId = null, onCancelReply }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !body) return;

    onAdd({ name, email, body, parentId });

    setName("");
    setEmail("");
    setBody("");
    if (onCancelReply) onCancelReply();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full rounded-2xl"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded-2xl"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Comment"
        className="border p-2 w-full"
        rows="4"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <button
        className="bg-color3 text-white px-4 py-2 rounded-xl font-serif"
        type="submit"
      >
        {parentId ? "Add Reply" : "Add Comment"}
      </button>
      {parentId && (
        <button
          type="button"
          onClick={onCancelReply}
          className="ml-2 text-gray-500 underline"
        >
          Cancel Reply
        </button>
      )}
    </form>
  );
}

export default CommentForm;

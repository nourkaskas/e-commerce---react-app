import { useState } from "react";
import CommentForm from "./CommentForm";

function CommentList({
  comments,
  onDelete,
  onEdit,
  onAdd,
  onLike,
  commentLikes,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editedBody, setEditedBody] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const handleEdit = (id, body) => {
    setEditingId(id);
    setEditedBody(body);
  };

  const handleEditSubmit = (id) => {
    onEdit(id, editedBody);
    setEditingId(null);
    setEditedBody("");
  };

  const getReplies = (parentId) =>
    comments.filter((c) => c.parentId === parentId);
  const mainComments = comments.filter((c) => !c.parentId);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 font-serif text-color2">
        Comments:
      </h3>

      {mainComments.map((c) => (
        <div key={c.id || c.email} className="border-b py-2">
          <p className="font-bold font-serif text-color3">
            {c.name} <span className="text-sm text-gray-500">({c.email})</span>
          </p>

          {editingId === c.id ? (
            <div>
              <textarea
                className="border w-full p-2"
                rows="3"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              />
              <div className="space-x-2 mt-1">
                <button
                  onClick={() => handleEditSubmit(c.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p>{c.body}</p>
          )}

          <button
            onClick={() => onLike(c.id)}
            className={`text-sm mt-1  ${
              commentLikes[c.id] ? "text-blue-600 font-bold" : "text-gray-600"
            }`}
          >
            👍 {commentLikes[c.id] || 0}
          </button>

          {c.isUserComment && editingId !== c.id && (
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(c.id, c.body)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button onClick={() => onDelete(c.id)} className="text-red-500">
                Delete
              </button>
            </div>
          )}

          {replyingTo === c.id ? (
            <CommentForm
              onAdd={onAdd}
              parentId={c.id}
              onCancelReply={() => setReplyingTo(null)}
            />
          ) : (
            <button
              onClick={() => setReplyingTo(c.id)}
              className="text-sm text-blue-600 mt-1"
            >
              Reply
            </button>
          )}

          <div className="pl-8 mt-2">
            {getReplies(c.id).map((reply) => (
              <div
                key={reply.id}
                className="border-l-2 border-gray-300 pl-4 mb-2"
              >
                <p className="font-bold font-serif text-color3">
                  {reply.name}{" "}
                  <span className="text-sm text-gray-500">({reply.email})</span>
                </p>
                <p>{reply.body}</p>

                <button
                  onClick={() => onLike(reply.id)}
                  className={`text-sm mt-1  ${
                    commentLikes[reply.id]
                      ? "text-blue-600 font-bold"
                      : "text-gray-600"
                  }`}
                >
                  👍 {commentLikes[reply.id] || 0}
                </button>

                {reply.isUserComment && (
                  <div className="mt-1 space-x-2">
                    <button
                      onClick={() => handleEdit(reply.id, reply.body)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(reply.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;

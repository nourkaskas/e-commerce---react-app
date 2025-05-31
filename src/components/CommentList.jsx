import { useState } from "react";

function CommentList({ comments, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editedBody, setEditedBody] = useState("");

  const handleEdit = (id, body) => {
    setEditingId(id);
    setEditedBody(body);
  };

  const handleEditSubmit = (id) => {
    onEdit(id, editedBody);
    setEditingId(null);
    setEditedBody("");
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 font-serif text-color2">
        Comments:
      </h3>

      {comments.map((c) => (
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
        </div>
      ))}
    </div>
  );
}

export default CommentList;

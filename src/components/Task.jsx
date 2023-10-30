import React, { useState } from "react";
import "../styles/Content.css";

function Task({ task, onEdit, onDelete, status }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <button className="edit-button" onClick={handleEdit}>
            Guardar
          </button>
        </div>
      ) : (
        <div>
          <h3>{editedTask.title}</h3>
          <p>{editedTask.description}</p>
          <p>Status: {status}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Editar
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default Task;
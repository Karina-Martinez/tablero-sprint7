import React, { useState } from "react";
import "../styles/Content.css";

function Task({ task, onEdit, onDelete, status }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task, status });

  const handleEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleChangeStatus = (e) => {
    setEditedTask({ ...editedTask, status: e.target.value });
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
          <select
            value={editedTask.status}
            onChange={handleChangeStatus}
          >
            <option value="todo">Por hacer</option>
            <option value="in-progress">En proceso</option>
            <option value="done">Hecho</option>
          </select>
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
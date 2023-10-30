import React from "react";
import Task from "./Task";
import "../styles/BoardView.css";

function BoardView({ tasks, onEdit, onDelete }) {
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="board-view">
      <div className="board-column">
        <h2>Por hacer</h2>
        {todoTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            status="por hacer"
          />
        ))}
      </div>
      <div className="board-column">
        <h2>En proceso</h2>
        {inProgressTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            status="en proceso"
          />
        ))}
      </div>
      <div className="board-column">
        <h2>Hecho</h2>
        {doneTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            status="hecho"
          />
        ))}
      </div>
    </div>
  );
}

export default BoardView;
import React, { useState } from "react";
import BoardView from "./BoardView";
import "../styles/Content.css";

function Content() {
  const [projects, setProjects] = useState([
    { id: 1, name: "Proyecto 1", tasks: [] },
    { id: 2, name: "Proyecto 2", tasks: [] },
    // Add more projects as needed
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(1);

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

  const [newTask, setNewTask] = useState({ title: "", description: "", status: "todo" });

  const handleEditTask = (editedTask) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id === selectedProjectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) => {
              if (task.id === editedTask.id) {
                return editedTask;
              }
              return task;
            }),
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const handleDeleteTask = (taskId) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id === selectedProjectId && project.tasks.some((task) => task.id === taskId)) {
          return {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
          };
        }
        return project;
      });
      return updatedProjects;
    });
  };

  const addTask = () => {
    const updatedProjects = projects.map((project) =>
      project.id === selectedProjectId
        ? {
            ...project,
            tasks: [...project.tasks, { ...newTask, id: Date.now(), status: newTask.status }],
          }
        : project
    );
    setProjects(updatedProjects);
    setNewTask({ title: "", description: "", status: "todo" });
  };

  const switchProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div className="content">
      <div className="content-container">
        <h2>Proyectos</h2>
        <div>
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                onClick={() => switchProject(project.id)}
                className="project-item"
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>
        <h2>Backlog</h2>
        <div>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="task-title-input"
          />
          <textarea
            placeholder="Descripción de la tarea"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="task-description-textarea"
          />
          <select class="task-status-select" value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
            <option value="todo">Por hacer</option>
            <option value="in-progress">En proceso</option>
            <option value="done">Hecho</option>
          </select>
          <button onClick={addTask} className="add-task-button">
            Añadir Tarea
          </button>
        </div>
        <div>
          <BoardView
            tasks={selectedProject.tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default Content;
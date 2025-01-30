import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from "@fullcalendar/core/locales/fr";
import '../App.css';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('personal');
  const [taskStatus, setTaskStatus] = useState('A-faire');
  const [taskPriority, setTaskPriority] = useState('Faible');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openEditModal = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskCategory(task.category);
    setTaskStatus(task.status);
    setTaskPriority(task.priority);
    setTaskDeadline(task.deadline);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const saveTask = () => {
    if (!taskTitle.trim()) {
      alert("Le titre de la tâche est requis.");
      return;
    }

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      category: taskCategory,
      status: taskStatus,
      priority: taskPriority,
      deadline: taskDeadline,
    };

    setTasks([...tasks, newTask]);
    closeModal();

    setTaskTitle('');
    setTaskDescription('');
    setTaskCategory('personal');
    setTaskStatus('A-faire');
    setTaskPriority('Faible');
    setTaskDeadline('');
  };

  const updateTask = () => {
    if (!taskTitle.trim()) {
      alert("Le titre de la tâche est requis.");
      return;
    }

    const updatedTask = {
      ...editingTask,
      title: taskTitle,
      description: taskDescription,
      category: taskCategory,
      status: taskStatus,
      priority: taskPriority,
      deadline: taskDeadline,
    };

    setTasks(tasks.map(task => task === editingTask ? updatedTask : task));
    closeEditModal();
  };

  const deleteTask = (task) => {
    setTasks(tasks.filter(t => t !== task));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const calendarEvents = tasks.map(task => ({
    title: task.title,
    date: task.deadline ? task.deadline : new Date(), 
  }));

  return (
    <div>

      <header>
        <img src="1.png" alt="Organizer logo" />
        <h1>Organizer</h1>
        <div>
          <input 
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="dropdown">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">Les catégories</option>
              <option value="personal">Personnel</option>
              <option value="work">Travail</option>
              <option value="other">Autres</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">Les statuts</option>
              <option value="A-faire">A faire</option>
              <option value="En-progres">En progrès</option>
              <option value="Terminé">Terminé</option>
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="all">Les priorités</option>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Elevé">Élevé</option>
            </select>
          </div>
          <button onClick={openModal}>Ajouter une tâche</button>
        </div>
      </header>

      <main>
        <div className="board">
          <div className="list">
            <h3>Personnel</h3>
            {filteredTasks
              .filter(task => task.category === 'personal')
              .map((task, index) => (
                <div key={index} className="task">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p>{task.status} - {task.priority}</p>
                  <p><strong>Date :</strong> {task.deadline}</p>
                  <button onClick={() => openEditModal(task)}>Éditer</button>
                  <button onClick={() => deleteTask(task)}>Supprimer</button>
                </div>
              ))}
          </div>
          <div className="list">
            <h3>Travail</h3>
            {filteredTasks
              .filter(task => task.category === 'work')
              .map((task, index) => (
                <div key={index} className="task">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p>{task.status} - {task.priority}</p>
                  <p><strong>Date :</strong> {task.deadline}</p>
                  <button onClick={() => openEditModal(task)}>Éditer</button>
                  <button onClick={() => deleteTask(task)}>Supprimer</button>
                </div>
              ))}
          </div>
          <div className="list">
            <h3>Autres</h3>
            {filteredTasks
              .filter(task => task.category === 'other')
              .map((task, index) => (
                <div key={index} className="task">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p>{task.status} - {task.priority}</p>
                  <p><strong>Date :</strong> {task.deadline}</p>
                  <button onClick={() => openEditModal(task)}>Éditer</button>
                  <button onClick={() => deleteTask(task)}>Supprimer</button>
                </div>
              ))}
          </div>
        </div>

        <div id="calendar">
          <FullCalendar 
            plugins={[dayGridPlugin]} 
            initialView="dayGridMonth" 
            locale={frLocale} 
            events={calendarEvents} 
          />
        </div>
      </main>

      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <h2>Ajouter une tâche</h2>
            <input
              className="input-area"
              placeholder="Titre"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
            <textarea
              className="input-area"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <label>Les catégories</label>
            <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
              <option value="personal">Personnel</option>
              <option value="work">Travail</option>
              <option value="other">Autres</option>
            </select>
            <label>Status de la tâche</label>
            <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
              <option value="A-faire">A faire</option>
              <option value="En-progres">En progrès</option>
              <option value="Terminé">Terminé</option>
            </select>
            <label>Priorité de la tâche</label>
            <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Elevé">Élevé</option>
            </select>
            <input
              type="date"
              className="input-area"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
            <br />
            <button className="close-btn" onClick={closeModal}>Annuler</button>
            <button className="close-btn" onClick={saveTask}>Sauvegarder</button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="overlay">
          <div className="modal">
            <h2>Modifier la tâche</h2>
            <input
              className="input-area"
              placeholder="Titre"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
            <textarea
              className="input-area"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <label>Les catégories</label>
            <select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
              <option value="personal">Personnel</option>
              <option value="work">Travail</option>
              <option value="other">Autres</option>
            </select>
            <label>Status de la tâche</label>
            <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
              <option value="A-faire">A faire</option>
              <option value="En-progres">En progrès</option>
              <option value="Terminé">Terminé</option>
            </select>
            <label>Priorité de la tâche</label>
            <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Elevé">Élevé</option>
            </select>
            <input
              type="date"
              className="input-area"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
            <br />
            <button className="close-btn" onClick={closeEditModal}>Annuler</button>
            <button className="close-btn" onClick={updateTask}>Mettre à jour</button>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4>À propos d'Organizer</h4>
            <p>Organizer vous aide à rester productif et organisé. Gérez vos tâches facilement grâce aux catégories et aux priorités.</p>
          </div>
          <div className="footer-section contact">
            <h4>Nous contacter</h4>
            <p>Email: support@organizer.com</p>
            <p>Phone: +216 26 395 336</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Organizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

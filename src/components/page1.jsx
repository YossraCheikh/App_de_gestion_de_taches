import React, { useState } from "react";
import frLocale from '@fullcalendar/core/locales/fr'; 
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import './page1';
import "../App.css";

export default function Page1() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <header>
        <img src="1.png" alt="Organizer logo" />
        <h1>Organizer</h1>
        <div>
          <input type="text" id="searchBar" placeholder="Rechercher..." />

          <div className="dropdown">
            <select id="filterCategory">
              <option value="all">Les categories</option>
              <option value="personal">Personnel</option>
              <option value="work">Travail</option>
              <option value="other">Autres</option>
            </select>

            <select id="filterStatus">
              <option value="all">Les statuts</option>
              <option value="A-faire">A faire</option>
              <option value="En-progres">En progrès</option>
              <option value="Terminé">Terminé</option>
            </select>

            <select id="filterPriority">
              <option value="all">Les priorités</option>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Elevé">Elevé</option>
            </select>
          </div>

          <button id="addTask" onClick={openModal}>
            Ajouter une tâche
          </button>
        </div>
      </header>

      <main>
        <div className="board" id="board">
          <div className="list" data-category="personal">
            <h3>Personnel</h3>
          </div>
          <div className="list" data-category="work">
            <h3>Travail</h3>
          </div>
          <div className="list" data-category="other">
            <h3>Autres</h3>
          </div>
        </div>

        <div id="calendar">
          <FullCalendar
            plugins={[dayGridPlugin]} 
            initialView="dayGridMonth" 
            locale={frLocale} 
          />
        </div>

        <div id="noTasksMessage" className="no-tasks-box">
        </div>
      </main>

      {isModalOpen && (
        <div className="overlay" id="modalOverlay">
          <div className="modal">
            <h2>Ajouter une tâche</h2>
            <input
              className="input-area"
              id="taskTitle"
              placeholder="Titre"
              required
            />
            <textarea
              className="input-area"
              id="taskDescription"
              placeholder="Description"
            ></textarea>
            <label htmlFor="taskCategory">Les catégories</label>
            <select id="taskCategory">
              <option value="personal">Personnel</option>
              <option value="work">Travail</option>
              <option value="other">Autres</option>
            </select>
            <label htmlFor="taskStatus">Status de la tâche</label>
            <select id="taskStatus">
              <option value="A-faire">A faire</option>
              <option value="En-progres">En progrès</option>
              <option value="Terminé">Terminé</option>
            </select>
            <label htmlFor="taskPriority">Priorité de la tâche</label>
            <select id="taskPriority">
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Elevé">Elevé</option>
            </select>
            <input type="date" className="input-area" id="taskDeadline" />
            <br />
            <button className="close-btn" onClick={closeModal}>
              Annuler
            </button>
            <button className="close-btn">Sauvegarder</button>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4>À propos d'Organizer</h4>
            <p>
              Organizer vous aide à rester productif et organisé. Gérez vos tâches facilement grâce aux
              catégories et aux priorités.
            </p>
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

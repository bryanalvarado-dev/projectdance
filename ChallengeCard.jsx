// src/components/ChallengeCard.jsx
import React, { useState } from 'react';
import VideoModal from './VideoModal.jsx'; // Importamos el nuevo componente
import './ChallengeCard.css';

function ChallengeCard({ challenge, isCompleted, isFavorite, onToggleCompletion, onToggleFavorite }) {
  const { grupo, cancion, dificultad, duracion, urlVideo } = challenge;

  // Nuevo estado para controlar si el modal está visible
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* 1. COMPONENTE PRINCIPAL (TARJETA) */}
      <div className={`challenge-card ${dificultad.toLowerCase()} ${isCompleted ? 'completed' : ''}`}>

        {/* Sección de acciones */}
        <div className="card-actions">
          <button
            onClick={onToggleFavorite}
            className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
            title={isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
          >
            {isFavorite ? '⭐' : '☆'}
          </button>
          <button
            onClick={onToggleCompletion}
            className="completion-btn"
            title={isCompleted ? 'Marcar como pendiente' : 'Marcar como completado'}
          >
            {isCompleted ? '✅ Completado' : '☐ Pendiente'}
          </button>
        </div>

        <h3>{cancion}</h3>
        <p>
          **Grupo:** {grupo}
        </p>
        <p>
          **Dificultad:** <span className="difficulty-level">{dificultad}</span>
        </p>
        <p>
          **Duración:** {duracion}
        </p>

        {/* Botón que abre el modal */}
        <button
          className="video-button-link"
          onClick={() => setShowModal(true)}
        >
          Ver Coreografía 🎥
        </button>
      </div>

      {/* 2. COMPONENTE MODAL (CONDICIONAL) */}
      {showModal && (
        <VideoModal
          videoUrl={urlVideo}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default ChallengeCard;

// src/components/FilterBar.jsx
import React from 'react';
import './FilterBar.css';

function FilterBar({ onFilterChange }) {

  // Función que se llama cuando el usuario escribe en el campo de texto o cambia la dificultad
  const handleChange = (e) => {
    // onFilterChange recibe el nombre del campo (e.g., 'searchText', 'difficulty') y su valor
    onFilterChange(e.target.name, e.target.value);
  };

  return (
    <div className="filter-bar">

      {/* Campo de búsqueda por texto (Canción o Grupo) */}
      <input
        type="text"
        name="searchText"
        placeholder="Buscar por canción o grupo..."
        onChange={handleChange}
      />

      {/* Filtro por dificultad */}
      <select name="difficulty" onChange={handleChange}>
        <option value="">Todas las Dificultades</option>
        <option value="Fácil">Fácil</option>
        <option value="Medio">Medio</option>
        <option value="Difícil">Difícil</option>
      </select>

    </div>
  );
}

export default FilterBar;

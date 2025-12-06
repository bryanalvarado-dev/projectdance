import React, { useState } from 'react';
import { ChevronDown, Trophy, Zap } from 'lucide-react';
import './GroupAccordion.css';

// -----------------------------------------------------------
// 🚨 HELPER: Mover getDifficultyClass fuera del componente
// -----------------------------------------------------------
const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
        case 'Fácil': return 'difficulty-easy';
        case 'Intermedio': return 'difficulty-medium';
        case 'Experto': return 'difficulty-hard';
        default: return 'difficulty-unknown';
    }
};

// -----------------------------------------------------------
// 🚨 MOCK DATA PARA DESAFÍOS
// -----------------------------------------------------------
const mockChallenges = [
    {
        id: 1,
        title: "Super Shy - NewJeans",
        difficulty: "Fácil",
        group: "NewJeans",
        description: "Aprende la coreografía de 'Super Shy' paso a paso.",
        participants: 120,
        deadline: "2025-12-31"
    },
    {
        id: 2,
        title: "Hype Boy - NewJeans",
        difficulty: "Intermedio",
        group: "NewJeans",
        description: "Domina el ritmo contagioso y los movimientos fluidos.",
        participants: 90,
        deadline: "2025-12-15"
    },
    {
        id: 3,
        title: "Drama - aespa",
        difficulty: "Experto",
        group: "aespa",
        description: "El desafío más técnico. Requiere mucha práctica.",
        participants: 50,
        deadline: "2025-11-30"
    },
];

// -----------------------------------------------------------
// 🚨 COMPONENTE DE TARJETA DE DESAFÍO
// -----------------------------------------------------------
const ChallengeCard = ({ challenge }) => {
    return (
        <div className="challenge-card">
            <div className="challenge-header">
                <h4 className="challenge-title">{challenge.title}</h4>
                <span className={`challenge-difficulty ${getDifficultyClass(challenge.difficulty)}`}>
                    <Trophy size={14} style={{ marginRight: '5px' }} />
                    {challenge.difficulty}
                </span>
            </div>
            <p className="challenge-description">{challenge.description}</p>
            <div className="challenge-footer">
                <span><Zap size={14} /> Participantes: {challenge.participants}</span>
                <button className="join-button">¡Unirme al Challenge!</button>
            </div>
        </div>
    );
};


// -----------------------------------------------------------
// 🚨 COMPONENTE PRINCIPAL ACORDION
// -----------------------------------------------------------
function GroupAccordion() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openGroup, setOpenGroup] = useState(null);

    // 1. Filtrar desafíos basados en la búsqueda
    const filteredChallenges = (mockChallenges || []).filter(challenge => {
        // CRÍTICO: Usamos el operador de encadenamiento opcional (?.) para evitar 'undefined' en las propiedades
        const title = challenge.title?.toLowerCase() || '';
        const group = challenge.group?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();

        return title.includes(search) || group.includes(search);
    });

    // 2. Agrupar los desafíos por dificultad
    const challengesByDifficulty = filteredChallenges.reduce((acc, challenge) => {
        const difficulty = challenge.difficulty || 'Otro';
        if (!acc[difficulty]) {
            acc[difficulty] = [];
        }
        acc[difficulty].push(challenge);
        return acc;
    }, {});

    const toggleGroup = (difficulty) => {
        setOpenGroup(openGroup === difficulty ? null : difficulty);
    };

    return (
        <div className="group-accordion-container">
            <h2 className="accordion-main-title">🌟 Desafíos de Baile K-Pop</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar Challenge (ej: NewJeans, Drama, Fácil...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="accordion-list">
                {Object.keys(challengesByDifficulty).map((difficulty) => (
                    <div key={difficulty} className="accordion-group">
                        <div
                            className={`accordion-header ${getDifficultyClass(difficulty)}`}
                            onClick={() => toggleGroup(difficulty)}
                        >
                            <span className="header-title">Challenge "{difficulty}"</span>
                            <ChevronDown size={24} className={openGroup === difficulty ? 'arrow-up' : 'arrow-down'} />
                        </div>

                        <div className={`accordion-content ${openGroup === difficulty ? 'open' : ''}`}>
                            {challengesByDifficulty[difficulty].map(challenge => (
                                <ChallengeCard key={challenge.id} challenge={challenge} />
                            ))}
                        </div>
                    </div>
                ))}

                {filteredChallenges.length === 0 && searchTerm && (
                    <p className="no-results">No se encontraron desafíos para "{searchTerm}".</p>
                )}
            </div>
        </div>
    );
}

export default GroupAccordion;

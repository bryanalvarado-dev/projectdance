import React from 'react';
import { Users, Zap, Upload, User, LogOut, Bell } from 'lucide-react';
import './Sidebar.css';

// Datos de usuario simulados (necesarios para la barra lateral)
const mockUsername = "kpopfan";
const mockUserEmail = "kpopfan@challenge.com";

function Sidebar({ activeView, setActiveView, handleLogout }) {
    // 🔔 SIMULACIÓN DE ESTADO DE NOTIFICACIONES (Se inicializa en 3)
    const [unreadNotifications, setUnreadNotifications] = React.useState(3);

    const menuItems = [
        { name: 'Comunidad', icon: Users, view: 'social' },
        { name: 'Desafíos', icon: Zap, view: 'challenges' },
        { name: 'Subir', icon: Upload, view: 'upload' },
    ];

    // 🔔 NUEVO ELEMENTO DE NOTIFICACIONES
    const notificationItem = { name: 'Notificaciones', icon: Bell, view: 'notifications' };

    const handleMenuClick = (view) => {
        setActiveView(view);
        // 🔔 Lógica para "marcar como leídas" cuando se abre la vista de notificaciones
        if (view === 'notifications' && unreadNotifications > 0) {
            setUnreadNotifications(0);
        }
    };

    return (
        <div className="sidebar">

            {/* --- Sidebar Header y Logo --- */}
            <div className="sidebar-header">
                <h1>K-DANCE APP</h1>
            </div>

            <div className="sidebar-content">
                {/* --- User Info --- */}
                <div className="sidebar-user-info">
                    <div className="user-avatar">
                        {mockUsername.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="username-text">@{mockUsername}</p>
                        <p className="user-email-text">{mockUserEmail}</p>
                    </div>
                </div>

                {/* --- Navegación Principal --- */}
                <nav className="sidebar-nav">
                    <ul>
                        {/* Renderiza los ítems principales */}
                        {menuItems.map((item) => (
                            <li key={item.view}>
                                <a
                                    href="#"
                                    className={activeView === item.view ? 'active' : ''}
                                    onClick={() => handleMenuClick(item.view)}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </a>
                            </li>
                        ))}

                        {/* Renderiza el ítem de Notificaciones (con badge) */}
                        <li>
                            <a
                                href="#"
                                className={activeView === notificationItem.view ? 'active' : ''}
                                onClick={() => handleMenuClick(notificationItem.view)}
                            >
                                <notificationItem.icon size={20} />
                                {notificationItem.name}
                                {/* 🔔 BADGE DE NOTIFICACIONES */}
                                {unreadNotifications > 0 && (
                                    <span className="notification-badge">{unreadNotifications}</span>
                                )}
                            </a>
                        </li>

                        {/* Elemento "Mi Perfil" */}
                        <li>
                            <a
                                href="#"
                                className={activeView === 'profile' ? 'active' : ''}
                                onClick={() => handleMenuClick('profile')}
                            >
                                <User size={20} />
                                Mi Perfil
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* --- Footer y Botón de Cerrar Sesión --- */}
            <div className="sidebar-footer">
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <LogOut size={20} />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default Sidebar;

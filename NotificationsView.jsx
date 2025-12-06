import React from 'react';
import { Heart, MessageSquare, Trophy, Zap, Clock, UserCheck } from 'lucide-react';
import './NotificationsView.css';

// Datos de notificaciones simuladas
const mockNotifications = [
    {
        id: 1,
        type: 'like',
        message: 'A @proDancerMX le gustó tu video "OMG - NewJeans (Challenge)".',
        timestamp: 'Hace 5 minutos',
        read: false
    },
    {
        id: 2,
        type: 'comment',
        message: '@jungkook_army comentó tu video "FIRE - BTS (Challenge)".',
        timestamp: 'Hace 1 hora',
        read: false
    },
    {
        id: 3,
        type: 'challenge',
        message: '¡Nuevo desafío activo: Challenge ATEEZ "HALAZIA"!',
        timestamp: 'Ayer',
        read: false
    },
    {
        id: 4,
        type: 'follow',
        message: '@sweetMoves te ha empezado a seguir.',
        timestamp: 'Hace 3 días',
        read: true
    },
    {
        id: 5,
        type: 'deadline',
        message: 'El desafío de "Dynamite" termina en 48 horas.',
        timestamp: 'Hace 1 semana',
        read: true
    },
];

const NotificationIcon = ({ type }) => {
    switch (type) {
        case 'like':
            return <Heart size={20} color="#e74c3c" />;
        case 'comment':
            return <MessageSquare size={20} color="#3498db" />;
        case 'challenge':
            return <Zap size={20} color="#f39c12" />;
        case 'deadline':
            return <Clock size={20} color="#9b59b6" />;
        case 'follow':
            return <UserCheck size={20} color="#2ecc71" />;
        default:
            return <Trophy size={20} color="#888" />;
    }
};

function NotificationsView() {
    const [notifications, setNotifications] = React.useState(mockNotifications);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="notifications-view-container">
            <header className="notifications-header">
                <h2 className="notifications-title">
                    🔔 Centro de Notificaciones ({unreadCount} sin leer)
                </h2>
                {unreadCount > 0 && (
                    <button className="mark-read-button" onClick={markAllAsRead}>
                        Marcar todo como leído
                    </button>
                )}
            </header>

            <div className="notifications-list">
                {notifications.map(n => (
                    <div key={n.id} className={`notification-item ${n.read ? 'read' : 'unread'}`}>
                        <div className="notification-icon-wrapper">
                            <NotificationIcon type={n.type} />
                        </div>
                        <div className="notification-content">
                            <p className="notification-message">{n.message}</p>
                            <span className="notification-timestamp">{n.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationsView;

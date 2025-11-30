import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import './AuthForm.css';

// Importaciones de Firebase (solo si está disponible)
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';


// CRÍTICO: La prop esperada es onLoginSuccess
function AuthForm({ onLoginSuccess, authInstance }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('mockuser@kpop.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Bloquear llamada a Firebase si no está inicializado (Mock Mode)
        if (!authInstance) {
            setError("Error de configuración. La autenticación no está disponible. Usando Mock Mode.");
            setLoading(false);

            // Simula éxito para entrar en modo mock si las credenciales son las mock
            if (email === 'mockuser@kpop.com' && password === '123456' && onLoginSuccess) {
                 onLoginSuccess({ user: { uid: 'mock-user-id-001', email: email } });
            }
            return;
        }

        try {
            let userCredential;
            if (isRegistering) {
                userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
            } else {
                userCredential = await signInWithEmailAndPassword(authInstance, email, password);
            }

            // CRÍTICO: Llamar a la prop correcta
            if (onLoginSuccess) {
                onLoginSuccess(userCredential);
            }

        } catch (err) {
            console.error("Auth Error:", err.message);
            setError(err.message.includes('email-already-in-use') ? 'El email ya está registrado.' :
                      err.message.includes('wrong-password') ? 'Contraseña incorrecta.' :
                      err.message.includes('user-not-found') ? 'Usuario no encontrado.' :
                      'Error de autenticación. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-card">
            <h2>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group-auth">
                    <Mail size={20} />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group-auth">
                    <Lock size={20} />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                {error && <p className="auth-error-message">{error}</p>}

                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Cargando...' : isRegistering ? (
                        <>
                            <UserPlus size={20} /> Registrarme
                        </>
                    ) : (
                        <>
                            <LogIn size={20} /> Entrar
                        </>
                    )}
                </button>
            </form>

            <div className="auth-switch">
                <p>
                    {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                    <span onClick={() => setIsRegistering(!isRegistering)} className="switch-link">
                        {isRegistering ? ' Iniciar Sesión' : ' Regístrate'}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default AuthForm;

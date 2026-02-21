import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext ';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children ,adminOnly = false}) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="loading-screen">
            <div className="spinner"></div>
            <p>جاري التحقق من الهوية...</p>
        </div>
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/" replace />; 
    }


  return children;
}

export default ProtectedRoute
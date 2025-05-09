import { Navigate } from 'react-router-dom';

const ProtecteAdminDashboard = ({ children }) => {
    const token = localStorage.getItem('user');
    
    if (!token) {
        // Redirige vers /login/staff si non authentifié
        return <Navigate to="/login/staff" replace />;
    }

    return children;
};

export default ProtecteAdminDashboard;
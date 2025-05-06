import { Navigate } from 'react-router-dom';

const ProtecteEnseignantDashboard = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Redirige vers /login/staff si non authentifié
        return <Navigate to="/login/staff" replace />;
    }

    return children;
};

export default ProtecteEnseignantDashboard;
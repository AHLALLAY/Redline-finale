import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Logout() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            localStorage.clear();
            navigate('/login/staff');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleLogout}>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 transition-colors"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    {isLoading ? 'Déconnexion...' : 'Déconnexion'}
                </button>
            </form>
        </div>
    );
}

export default Logout;
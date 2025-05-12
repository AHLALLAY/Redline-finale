import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterGlobal from '../../components/Global/FooterGlobal';
import { FaUserTie, FaLock, FaSchool, FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';



function LoginStaff() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Vérifier si l'utilisateur est déjà connecté avec un compte suspendu/supprimé
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            if (user.is_suspended || user.is_deleted) {
                localStorage.removeItem('user');
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur de connexion');
            }

            if (data.data.staff.is_deleted || data.data.staff.is_suspended) {
                localStorage.removeItem('user');
                return navigate('/404', { state: { from: 'login' } });
            }

            const userData = {
                token: data.data.token,
                id: data.data.staff.id,
                email: data.data.staff.email,
                name: data.data.staff.name,
                role: data.data.staff.role,
                birth_date: data.data.staff.birth_date,
                phone: data.data.staff.phone,
                cin: data.data.staff.cin,
                last_diploma: data.data.staff.last_diploma,
                obtained_at: data.data.staff.obtained_at,
                subject_name: data.data.staff.subject_name,
                is_suspended: data.data.staff.is_suspended,
                is_deleted: data.data.staff.is_deleted,
                created_at: data.data.staff.created_at,
            };

            localStorage.setItem('user', JSON.stringify(userData));

            setSuccess('Connexion réussie! Redirection en cours...');

            const rolePath = data.data.staff.role.toLowerCase();
            const redirectPath = `/${rolePath}/dashboard`;

            setTimeout(() => {
                navigate(redirectPath);
            }, 1500);

        } catch (err) {
            console.error('Erreur de connexion:', err);
            setError(err.message || 'Email ou mot de passe incorrect');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100">
            {/* Header */}
            <header className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg h-16 flex items-center">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-orange-900">Ω</span>
                            <span className="text-xl font-bold hidden sm:inline-block">MEGA SCHOOL</span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => navigate('/')}
                                className="bg-white text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-lg text-sm font-semibold transition-colors duration-200 shadow hover:shadow-md"
                            >
                                Accueil
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-white text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-lg text-sm font-semibold transition-colors duration-200 shadow hover:shadow-md"
                            >
                                Inscrire autant qu'admin
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 mt-6">
                {/* Formulaire de connexion */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="inline-block p-3 bg-orange-100 rounded-full mb-3">
                                <FaUserTie className="text-orange-600 text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Connexion Personnel</h3>
                            <p className="text-gray-600 mt-1">Accédez à votre espace de travail</p>
                        </div>

                        <div className="bg-white border border-orange-200 rounded-lg p-6 shadow-md">
                            {/* Messages d'erreur/succès */}
                            <div className="mb-6">
                                {error && (
                                    <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">{error}</span>
                                        </div>
                                    </div>
                                )}
                                {success && (
                                    <div className="p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md shadow-md">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="font-medium">{success}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUserTie className="text-orange-500" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required
                                            placeholder="votre.email@megaschool.ma"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mot de Passe <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-orange-500" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember_me"
                                            name="remember_me"
                                            type="checkbox"
                                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                                            Se souvenir de moi
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                                            Mot de passe oublié?
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200`}
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Connexion en cours...
                                        </span>
                                    ) : 'Se connecter'}
                                </button>
                            </div>
                            <div className="mt-6 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => navigate('/login/student')}
                                    className="flex items-center text-sm text-orange-600 hover:text-orange-800"
                                >
                                    <FaSchool className="mr-2" />
                                    Espace élèves
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Section Omega (remplace l'image) */}
                <div className="hidden md:flex md:w-1/2 bg-orange-100 items-center justify-center">
                    <div className="text-center p-8">
                        <span className="text-[25rem] font-bold text-orange-600 leading-none">Ω</span>
                        <div className="flex justify-center space-x-2">
                            {'school'.split('').map((letter, index) => (
                                <div
                                    key={index}
                                    className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center shadow-md"
                                >
                                    <span className="text-white font-bold text-lg">{letter}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FooterGlobal />
        </div>
    );
}

export default LoginStaff;
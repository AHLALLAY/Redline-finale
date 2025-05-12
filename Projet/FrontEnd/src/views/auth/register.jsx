import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaLock, FaIdCard, FaCalendarAlt, FaPhone, FaGraduationCap, FaBook, FaTimes } from 'react-icons/fa';

function RegisterStaff({ onClose }) {
    const initialFormData = {
        name: '',
        email: '',
        cin: '',
        password: '',
        role: 'Admin',
        birth_date: '',
        phone: '',
        last_diploma: '',
        obtained_at: '',
        subject_id: '',
        is_suspended: false,
        is_deleted: false
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de l\'inscription');
            }

            setSuccess('Inscription réussie! Redirection en cours...');
            setFormData(initialFormData);

            setTimeout(() => {
                onClose && onClose();
                navigate('/login/staff');
            }, 1500);

        } catch (err) {
            console.error('Erreur d\'inscription:', err);
            setError(err.message || 'Une erreur est survenue lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-orange-200 mb-6">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-orange-600">Ω</span>
                            <h3 className="text-xl font-bold text-gray-800">Inscription Personnel</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-orange-600 transition"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Colonne de gauche */}
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nom complet <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUserTie className="text-orange-500" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required
                                            placeholder="Ex: Mohamed Alami"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
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
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required
                                            placeholder="••••••••"
                                            minLength="8"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Minimum 8 caractères</p>
                                </div>

                                <div>
                                    <label htmlFor="cin" className="block text-sm font-medium text-gray-700 mb-1">
                                        CIN <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaIdCard className="text-orange-500" />
                                        </div>
                                        <input
                                            type="text"
                                            name="cin"
                                            id="cin"
                                            value={formData.cin}
                                            onChange={handleChange}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required
                                            placeholder="Ex: BE123456"
                                            maxLength="9"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date de naissance <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaCalendarAlt className="text-orange-500" />
                                        </div>
                                        <input
                                            type="date"
                                            name="birth_date"
                                            id="birth_date"
                                            value={formData.birth_date}
                                            onChange={handleChange}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Vous devez avoir au moins 18 ans</p>
                                </div>
                            </div>

                            {/* Colonne de droite */}
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Téléphone
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaPhone className="text-orange-500" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Ex: 0612345678"
                                            pattern="^(\+212|0)[\s\-\.]?[5-7][\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}$"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last_diploma" className="block text-sm font-medium text-gray-700 mb-1">
                                        Dernier diplôme <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaGraduationCap className="text-orange-500" />
                                        </div>
                                        <input
                                            type="text"
                                            name="last_diploma"
                                            id="last_diploma"
                                            value={formData.last_diploma}
                                            onChange={handleChange}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required
                                            placeholder="Ex: Licence en Mathématiques"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="obtained_at" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date d'obtention du diplôme <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaCalendarAlt className="text-orange-500" />
                                        </div>
                                        <input
                                            type="date"
                                            name="obtained_at"
                                            id="obtained_at"
                                            value={formData.obtained_at}
                                            onChange={handleChange}
                                            className="pl-10 block w-full px-3 py-2 border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-orange-300 rounded-md text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white ${loading ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Inscription en cours...
                                    </span>
                                ) : 'S\'inscrire'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterStaff;
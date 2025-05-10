import { useNavigate } from 'react-router-dom';
import {FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import FooterGlobal from '../Global/FooterGlobal';

function NotFound() {
    const navigate = useNavigate();

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
                        <div>
                            <button
                                onClick={() => navigate('/')}
                                className="bg-white text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-lg text-sm font-semibold transition-colors duration-200 shadow hover:shadow-md"
                            >
                                Accueil
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6 sm:p-10">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-orange-100 p-3 rounded-full mb-4">
                                <FaExclamationTriangle className="text-orange-600 text-4xl" />
                            </div>
                            <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Non Trouvée</h2>
                            <div className="bg-orange-50 w-full p-4 mb-6 rounded-lg border border-orange-200">
                                {/* Message spécifique pour les comptes suspendus ou supprimés */}
                                <p className="text-gray-600 mt-2">
                                    Si vous essayez de vous connecter, il est possible que votre compte ait été suspendu ou supprimé.
                                    Veuillez contacter l'administration pour plus d'informations.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <button
                                    onClick={() => navigate('/')}
                                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-md flex items-center justify-center transition-colors duration-200"
                                >
                                    <FaHome className="mr-2" />
                                    Page d'accueil
                                </button>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="flex-1 border border-orange-500 text-orange-600 hover:bg-orange-50 py-2 px-6 rounded-md flex items-center justify-center transition-colors duration-200"
                                >
                                    <FaArrowLeft className="mr-2" />
                                    Page précédente
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-orange-50 p-4 border-t border-orange-200">
                        <div className="flex items-center justify-center">
                            <span className="text-2xl font-bold text-orange-600 mr-2">Ω</span>
                            <span className="text-gray-700">MEGA SCHOOL | Support technique: support@megaschool.ma</span>
                        </div>
                    </div>
                </div>
            </div>

            <FooterGlobal />
        </div>
    );
}

export default NotFound;
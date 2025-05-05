import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        { id: 'offres', label: 'Nos offres' },
        { id: 'propos', label: 'À propos' }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const navigateToLogin = () => {
        navigate('/Login/staff');
    }

    return (
        <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3">
                {/* Menu Desktop */}
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="inline-flex items-center">
                        <span className="text-5xl font-bold text-orange-600 mr-2">Ω</span>
                        <h1 className="text-3xl font-bold text-orange-600 hidden md:block">
                            OMEGA SCHOOL
                        </h1>
                    </div>

                    {/* Menu Desktop */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        {menuItems.map(item => (
                            <button
                                className="text-gray-800 hover:text-orange-600 font-medium transition-colors"
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button 
                            onClick={navigateToLogin} 
                            className="bg-orange-600 text-white rounded-full px-4 py-2 hover:bg-orange-700 transition-colors duration-200 shadow hover:shadow-md"
                        >
                            Connexion
                        </button>
                    </nav>
                </div>

                {/* Menu Mobile */}
                <div className="flex justify-between items-center md:hidden">
                    {/* Bouton Mobile */}
                    <button
                        className="text-gray-800"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg rounded-lg mt-2">
                    <nav className="flex flex-col space-y-3 p-4">
                        {menuItems.map(item => (
                            <button
                                className="text-left py-2 text-gray-800 hover:text-orange-600 font-medium"
                                key={item.id}
                                onClick={() => {
                                    scrollToSection(item.id);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button 
                            onClick={navigateToLogin}
                            className="bg-orange-600 text-white rounded-lg px-4 py-2 hover:bg-orange-700 transition-colors duration-200"
                        >
                            Connexion
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
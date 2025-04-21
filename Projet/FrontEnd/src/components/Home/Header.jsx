import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuItems = [
        { id: 'offres', label: 'Nos offres' },
        { id: 'propos', label: 'À propos' }
    ];

    const scrollToSection = () => {

    }

    return (
        <header>
            <div>
                {/* Menu Desktop */}
                <div>
                    {/* Logo */}
                    <h1>OMEAGR SCHOOL</h1>
                    {/* Menu */}
                    <nav>
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => { scrollToSection }}
                            >{item.label}</button>
                        ))}
                    </nav>
                </div>

                {/* Menu Mobile */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            <div>
                <nav>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                scrollToSection;
                                setMobileMenuOpen(false);
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
}
export default Header;
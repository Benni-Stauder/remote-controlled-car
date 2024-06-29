import React, {useState} from 'react';
import { useLanguage } from '../language_context';

function NavBar() {
    const { language, toggleLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    console.log(language);

    return (
        <nav className="navbar">
            <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/features">Features</a></li>
                <li><a href="/documentation">Documentation</a></li>
                <li><a href="/contact">Contact</a></li>
                <li>
                    <button onClick={() => toggleLanguage()}>
                        {language === 'en' ? 'DE' : 'EN'}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
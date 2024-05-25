import React, { useState } from 'react';

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

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
            </ul>
        </nav>
    );
}

export default NavBar;

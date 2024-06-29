// App.js

import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Features from './Features';
import Contact from './Contact';
import PrivacyPolicy from "./PrivacyPolicy";
import Imprint from "./Imprint";
import Documentation from "./Documentation";
import { LanguageProvider } from '../language_context'; // Adjust path as per your project structure

function App() {
    return (
        <Router>
            <LanguageProvider> {/* Wrap entire application with LanguageProvider */}
                <NavBar />
                <div className="content">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="features" element={<Features />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="privacy" element={<PrivacyPolicy />} />
                        <Route path="imprint" element={<Imprint />} />
                        <Route path="documentation" element={<Documentation />} />
                    </Routes>
                </div>
                <Footer />
            </LanguageProvider>
        </Router>
    );
}

export default App;
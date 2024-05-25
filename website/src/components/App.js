import React from 'react';
import NavBar from './NavBar'; // Assuming you have a NavBar component
import Footer from './Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Features from './Features';
import Contact from './Contact';
import PrivacyPolicy from "./PrivacyPolicy";
import Imprint from "./Imprint";
import Documentation from "./Documentation";

function App() {
    return (
        <Router>
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
        </Router>
    );
}

export default App;

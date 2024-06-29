import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import rc_car_pov_picture from './../media/pov_rc_car.webp';
import controls_picture from './../media/controls.webp';
import { useLanguage } from '../language_context';

function Home() {
    const headingRef = useRef(null);
    const { language } = useLanguage(); // Access language state from context

    const [expandInnovation, setExpandInnovation] = useState(false);
    const [expandControl, setExpandControl] = useState(false);
    const [expandAccessibility, setExpandAccessibility] = useState(false);

    useEffect(() => {
        gsap.from(headingRef.current, { duration: 1, autoAlpha: 0, ease: 'power1.out', y: 30 });
    }, []);

    // English and German content
    const content = {
        en: {
            welcome: "Welcome to the RC Car Project!",
            intro1: "This is where you'll find information about our innovative RC car designs.",
            intro2: "Discover the forefront of remote control vehicle technology.",
            innovation: "Innovative Camera Integration",
            innovationText: "This project revolutionizes how cameras are integrated into remote control vehicles, allowing for unprecedented video quality and control precision.",
            control: "Advanced Control Systems",
            controlText: "Our RC cars are equipped with state-of-the-art control systems that can be operated from various devices, including controllers and simulation rigs.",
            accessibility: "Accessibility and User-Friendliness",
            accessibilityText: "We ensure that our technology is accessible to enthusiasts of all skill levels, providing easy-to-use interfaces and comprehensive support."
        },
        de: {
            welcome: "Willkommen beim RC Car Projekt!",
            intro1: "Hier finden Sie Informationen zu unseren innovativen RC-Auto-Designs.",
            intro2: "Entdecken Sie die Spitze der Fernsteuerungsfahrzeugtechnologie.",
            innovation: "Innovative Kamera-Integration",
            innovationText: "Dieses Projekt revolutioniert die Integration von Kameras in Fernsteuerungsfahrzeuge und ermöglicht beispiellose Videoqualität und Präzision in der Steuerung.",
            control: "Fortgeschrittene Steuersysteme",
            controlText: "Unsere RC-Autos sind mit modernsten Steuersystemen ausgestattet, die von verschiedenen Geräten aus bedient werden können, darunter Controller und Simulationseinrichtungen.",
            accessibility: "Barrierefreiheit und Benutzerfreundlichkeit",
            accessibilityText: "Wir stellen sicher, dass unsere Technologie für Enthusiasten aller Erfahrungsstufen zugänglich ist, indem wir benutzerfreundliche Schnittstellen und umfassenden Support bieten."
        }
    };

    return (
        <div className="container">
            <h1>{content[language].welcome}</h1>
            <p>{content[language].intro1}</p>
            <p>{content[language].intro2}</p>

            <div className="expandable-section">
                <h2 onClick={() => setExpandInnovation(!expandInnovation)}>{content[language].innovation}</h2>
                {expandInnovation && (
                    <div>
                        <p>{content[language].innovationText}</p>
                        <img src={rc_car_pov_picture} alt="POV RC Car"/>
                    </div>
                )}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandControl(!expandControl)}>{content[language].control}</h2>
                {expandControl && (
                    <div>
                        <p>{content[language].controlText}</p>
                        <img src={controls_picture} alt="RC Car Controls"/>
                    </div>
                )}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandAccessibility(!expandAccessibility)}>{content[language].accessibility}</h2>
                {expandAccessibility &&
                    <p>{content[language].accessibilityText}</p>}
            </div>
        </div>
    );
}

export default Home;

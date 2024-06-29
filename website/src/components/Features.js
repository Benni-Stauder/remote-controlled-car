import React, { useState } from 'react';
import { useLanguage } from '../language_context';
import esp_picture from './../media/esp.jpg';

function Features() {
    const { language } = useLanguage(); // Access language state from context

    const [expandCamera, setExpandCamera] = useState(false);
    const [expandControlSystem, setExpandControlSystem] = useState(false);
    const [expandDurability, setExpandDurability] = useState(false);

    // English and German content
    const content = {
        en: {
            title: "Features",
            camera: "High-Definition Camera",
            cameraText: "The RC car is equipped with a high-definition camera providing real-time video feed and recording capabilities for enhanced navigation and experience.",
            controlSystem: "Advanced Control System",
            controlSystemText: "Our control system allows seamless operation from various devices, including remote controllers and simulation rigs, ensuring precise handling under all conditions.",
            durability: "Enhanced Durability",
            durabilityText: "Designed to withstand rigorous use, our RC cars feature robust construction with weather-resistant materials, suitable for all terrains and conditions."
        },
        de: {
            title: "Eigenschaften",
            camera: "Hochauflösende Kamera",
            cameraText: "Das RC-Auto ist mit einer hochauflösenden Kamera ausgestattet, die Echtzeit-Videofeed und Aufnahmefunktionen für eine verbesserte Navigation und Erfahrung bietet.",
            controlSystem: "Fortgeschrittenes Steuersystem",
            controlSystemText: "Unser Steuersystem ermöglicht nahtlose Bedienung von verschiedenen Geräten, einschließlich Fernsteuerungen und Simulationseinrichtungen, für präzises Handling unter allen Bedingungen.",
            durability: "Erhöhte Haltbarkeit",
            durabilityText: "Entwickelt, um intensiven Gebrauch zu widerstehen, verfügen unsere RC-Autos über eine robuste Konstruktion mit wetterbeständigen Materialien, geeignet für alle Gelände und Bedingungen."
        }
    };

    return (
        <div className="container">
            <h1>{content[language].title}</h1>

            <div className="expandable-section">
                <h2 onClick={() => setExpandCamera(!expandCamera)}>{content[language].camera}</h2>
                {expandCamera && <p>{content[language].cameraText}</p>}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandControlSystem(!expandControlSystem)}>{content[language].controlSystem}</h2>
                {expandControlSystem && (
                    <div>
                        <p>{content[language].controlSystemText}</p>
                        <img src={esp_picture} alt="Electronic Stability Control"/>
                    </div>
                )}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandDurability(!expandDurability)}>{content[language].durability}</h2>
                {expandDurability && <p>{content[language].durabilityText}</p>}
            </div>
        </div>
    );
}

export default Features;

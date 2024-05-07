import React, { useState } from 'react';
import esp_picture from './../media/esp.jpg';

function Features() {
    const [expandCamera, setExpandCamera] = useState(false);
    const [expandControlSystem, setExpandControlSystem] = useState(false);
    const [expandDurability, setExpandDurability] = useState(false);

    return (
        <div className="container">
            <h1>Features</h1>

            <div className="expandable-section">
                <h2 onClick={() => setExpandCamera(!expandCamera)}>High-Definition Camera</h2>
                {expandCamera && <p>The RC car is equipped with a high-definition camera providing real-time video feed and recording capabilities for enhanced navigation and experience.</p>}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandControlSystem(!expandControlSystem)}>Advanced Control System</h2>
                {expandControlSystem && (
                    <div>
                        <p>Our control system allows seamless operation from various devices, including remote
                            controllers and simulation rigs, ensuring precise handling under all conditions.</p>
                        <img src={esp_picture} alt="Electronic Stability Control"/>
                    </div>
                )}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandDurability(!expandDurability)}>Enhanced Durability</h2>
                {expandDurability && <p>Designed to withstand rigorous use, our RC cars feature robust construction with weather-resistant materials, suitable for all terrains and conditions.</p>}
            </div>
        </div>
    );
}

export default Features;
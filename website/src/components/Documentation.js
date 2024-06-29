import React from 'react';
import { useState } from 'react';
import { useLanguage } from '../language_context';
import GettingStarted from "./documentation/GettingStarted";
import Hardware from "./documentation/Hardware";
import Source from "./documentation/software/Source";
import Backend from "./documentation/software/Backend";
import Input from "./documentation/software/Input";
import Demo from "./documentation/software/Demo";
import Frontend from "./documentation/Frontend";
import Rccar from "./documentation/Rccar";

function Documentation() {
    const { language } = useLanguage(); // Access language state from context

    const [activeTab, setActiveTab] = useState('gettingStarted');

    // Define translations for tab names and content
    const tabs = {
        en: {
            gettingStarted: "Getting Started",
            hardware: "Hardware Documentation",
            software: "Software Documentation",
            frontend: "Frontend Documentation",
            rccar: "RC Car Documentation"
        },
        de: {
            gettingStarted: "Erste Schritte",
            hardware: "Hardware-Dokumentation",
            software: "Software-Dokumentation",
            frontend: "Frontend-Dokumentation",
            rccar: "RC Auto-Dokumentation"
        }
    };

    // Define components for each tab
    const tabComponents = {
        gettingStarted: <GettingStarted />,
        hardware: <Hardware />,
        source: <Source setActiveTab={setActiveTab} />,
        software: <Source setActiveTab={setActiveTab} />,
        backend: <Backend setActiveTab={setActiveTab} />,
        input: <Input setActiveTab={setActiveTab} />,
        demo: <Demo setActiveTab={setActiveTab} />,
        frontend: <Frontend />,
        rccar: <Rccar />
    };

    return (
        <div>
            <div className="sub-navbar">
                <button onClick={() => setActiveTab('gettingStarted')}>{tabs[language].gettingStarted}</button>
                <button onClick={() => setActiveTab('hardware')}>{tabs[language].hardware}</button>
                <button onClick={() => setActiveTab('software')}>{tabs[language].software}</button>
                <button onClick={() => setActiveTab('frontend')}>{tabs[language].frontend}</button>
                <button onClick={() => setActiveTab('rccar')}>{tabs[language].rccar}</button>
            </div>
            <div className="container-documentation">
                <div className="container">
                    {tabComponents[activeTab]}
                </div>
            </div>
        </div>
    );
}

export default Documentation;

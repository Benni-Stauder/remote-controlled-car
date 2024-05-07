import React from 'react';
import { useState } from 'react';
import GettingStarted from "./documentation/GettingStarted";
import Hardware from "./documentation/Hardware";

function Documentation() {
    const [activeTab, setActiveTab] = useState('gettingStarted');

    return (
        <div>
            <div className="sub-navbar">
                <button onClick={() => setActiveTab('gettingStarted')}>Getting Started</button>
                <button onClick={() => setActiveTab('hardware')}>Hardware Documentation</button>
                <button onClick={() => setActiveTab('software')}>Software Documentation</button>
                <button onClick={() => setActiveTab('api')}>API Documentation</button>
                <button onClick={() => setActiveTab('userManual')}>User Manual</button>
                <button onClick={() => setActiveTab('advanced')}>Advanced Topics</button>
            </div>
            <div className="container-documentation">
                <div className="container">
                    {activeTab === 'gettingStarted' && <GettingStarted />}
                    {activeTab === 'hardware' && <Hardware />}
                    {activeTab === 'software' && <p>Software setup, configuration tips, troubleshooting...</p>}
                    {activeTab === 'api' && <p>API endpoints, developer guides, examples...</p>}
                    {activeTab === 'userManual' && <p>Operating instructions, maintenance tips, FAQs...</p>}
                    {activeTab === 'advanced' && <p>Customization tips, integration ideas...</p>}
                </div>
            </div>
        </div>
    );
}

export default Documentation;

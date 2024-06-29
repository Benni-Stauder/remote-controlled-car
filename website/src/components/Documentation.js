import React from 'react';
import { useState } from 'react';
import GettingStarted from "./documentation/GettingStarted";
import Hardware from "./documentation/Hardware";
import Source from "./documentation/software/Source";
import Frontend from "./documentation/Frontend";
import Rccar from "./documentation/Rccar";

function Documentation() {
    const [activeTab, setActiveTab] = useState('gettingStarted');

    return (
        <div>
            <div className="sub-navbar">
                <button onClick={() => setActiveTab('gettingStarted')}>Getting Started</button>
                <button onClick={() => setActiveTab('hardware')}>Hardware Documentation</button>
                <button onClick={() => setActiveTab('source')}>Software Documentation</button>
                <button onClick={() => setActiveTab('frontend')}>Frontend Documentation</button>
                <button onClick={() => setActiveTab('rccar')}>RC Car Documentation</button>
            </div>
            <div className="container-documentation">
                <div className="container">
                    {activeTab === 'gettingStarted' && <GettingStarted />}
                    {activeTab === 'hardware' && <Hardware />}

                    {activeTab === 'source' && <Source setActiveTab={setActiveTab}/>}
                    {activeTab === 'backend' && <Source setActiveTab={setActiveTab}/>}
                    {activeTab === 'input' && <Source setActiveTab={setActiveTab}/>}
                    {activeTab === 'demo' && <Source setActiveTab={setActiveTab}/>}

                    {activeTab === 'frontend' && <Frontend />}
                    {activeTab === 'rccar' && <Rccar />}
                </div>
            </div>
        </div>
    );
}

export default Documentation;

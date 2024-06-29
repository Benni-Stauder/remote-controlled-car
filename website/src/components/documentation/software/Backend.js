import React from 'react';

function Backend({ setActiveTab }) {
    const buttonStyle = {
        display: 'inline-block',
        outline: 0,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        borderRadius: '4px',
        fontSize: '13px',
        height: '30px',
        backgroundColor: '#2542ac',
        color: 'white',
        padding: '0 20px',
        transition: 'background-color 0.3s',
    };

    const hoverStyle = {
        backgroundColor: '#1f3997',
    };

    const floatRight = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '40px'
    };

    return (
        <div>
            <h1>Backend Directory</h1>

            <h2>Overview</h2>
            <p>The backend is designed to manage communication and data flow between the frontend and the RC car. It ensures that all data is correctly shared among the different components of this project.
                Additionally, the backend handles all incoming control inputs and stores them to be accessible for all components of the backend.</p>
            <br/>

            <h2>Files</h2>
            <ul>
                <li><strong>UDPServer.py</strong></li>
                <li><strong>WebSocketServer.py</strong></li>
                <li><strong>SharedData.py</strong></li>
            </ul>
            <br/>

            <h2>Running the Backend</h2>
            <p>The files of the backend are supposed to be executed as one complete ecosystem, not separately.
                To run the backend, you should use the <code>../main.py</code> script located in the parent folder of this directory.</p>
            <p>This script runs all the required parts of the backend together.
                <strong>Do not attempt</strong> to start individual components like <code>UDPServer.py</code> or <code>WebSocketServer.py</code> separately, as this will lead to unintended behavior.
                Refer to the README in the <code>src</code> directory for detailed instructions on how to run the backend correctly.</p>
            <br/>

            <h2>Purpose</h2>
            <p>The backend directory primarily contains a UDP server for communication with the RC car, a WebSocket server for data exchange with the frontend, and a shared data storage.</p>
            <p>The primary purpose is to facilitate the required data exchanges by running all interfaces asynchronously. The frontend, the RC car, and the input device (e.g., steering wheel) all access a single static class that acts as shared storage. A big advantage of this approach is that it prevents blocking interfaces since they all operate independently of each other.</p>
            <br/>

            <h2>Shared Data Access</h2>
            <p><code>SharedData</code> is a static class that contains exchanged data such as control inputs, RC car odometry, and user settings.
                It allows asynchronous components to access a common data storage for both writing and reading, ensuring that all parts of the backend have constant access to the currently available values.</p>
            <p>To prevent issues with data concurrency, Python's <code>asyncio.Lock</code> is used. Therefore, the lock makes sure that only one component can write to the shared data at a time. Meanwhile, reading does not require a lock and is possible for any component at any time.</p>

            <div style={floatRight}>
                <button
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={() => setActiveTab('source')}
                >
                    previous
                </button>
                <button
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={() => setActiveTab('input')}
                >
                    next
                </button>
            </div>
        </div>
    );
}

export default Backend;

import React from 'react';

function ProjectSource({ setActiveTab }) {
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
        justifyContent: 'flex-end',
        marginTop: '40px'
    };

    return (
        <div>
            <h1>Software documentation</h1>

            <h2>Overview</h2>
            <p>The project's source folder houses all the logic for both the backend and the rc car. Additionally, this
                directory includes the main.py script for launching the application. Executing this script establishes
                communication between the frontend, backend, and rc car and starts the polling for input data.
                Moreover, all networking configurations and input device calibrations are stored in
                a <code>config.json</code> file within the same directory.</p>
            <br/>

            <h2>Files</h2>
            <ul>
                <li><strong>main.py</strong></li>
                <li><strong>config.json</strong></li>
            </ul>
            <br/>

            <h2>Running the Project</h2>
            <p>To run the entire project, simply execute <code>main.py</code>. This script initializes all required
                components and starts their asynchronous execution:</p>
            <br/>

            <pre style={{marginLeft: 40 + "px"}}>
                <code>
                    {`deviceListener = InputDeviceListener()
                    server = ServerUDP()
                    websocket_server = WebSocketServer()
                    
                    await asyncio.gather(
                        deviceListener.run(),
                        server.start(),
                        websocket_server.start()
                    )`}
                </code>
            </pre>
            <br/>

            <p><strong>IMPORTANT:</strong> It is required to create and start instances of ALL three components of this
                project. Neglecting their dependencies could result in unexpected behavior and should therefore be
                avoided.</p>
            <br/>

            <h2>Project Configuration</h2>
            <p>The entire configuration for this project is contained within a single <code>config.json</code> file.
                This includes sections for network setup (UDP, Websockets) as well as mappings for input devices.</p>
            <p>Please make sure that the network configurations are correctly set with the appropriate IP addresses for
                both server and client. <strong>Do not modify</strong> the port and buffer settings if you are uncertain
                about their impact on the UDP or Websocket connection.</p>
            <p>A correct network configuration should resemble this example:</p>
            <br/>

            <pre style={{marginLeft: 40 + "px"}}>
                <code>
                    {`{
                      "frontend": {
                        "ip": "localhost",
                        "port": 8000
                      },
                      
                      "backend": {
                        "port": <random port>,
                        "bufferSize": 1024,
                        "server": {
                          "ip": <IP address of your pc>
                        },
                        
                        "client": {
                          "ip": <IP address of the rc car>
                        }
                      }
                    }`}
                </code>
            </pre>
            <br/>

            <p>The configuration settings for the input device depend on the selected gaming wheel. By default, the
                settings are configured for a <code>Logitech G29</code> steering wheel. To use other devices, key
                mappings must be edited within the <code>config.json</code> file.</p>

            <div style={floatRight}>
                <button
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={() => setActiveTab('backend')}
                >
                    next
                </button>
            </div>
        </div>
    );
}

export default ProjectSource;

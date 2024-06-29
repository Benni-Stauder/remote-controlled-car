import React from 'react';

function Input({ setActiveTab }) {
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
            <h1>Input Device Directory</h1>

            <h2>Overview</h2>
            <p>The input device directory is used to establish a connection to a gaming wheel or controller, process the received data, and store it inside the <code>SharedData.py</code> class of the backend. A correct mapping between the received inputs and the actually pressed buttons is guaranteed through the device setup in <code>config.json</code> (only required for gaming wheel).</p>
            <br/>

            <h2>Files</h2>
            <ul>
                <li><strong>InputDevice.py</strong></li>
                <li><strong>InputDeviceListener.py</strong></li>
            </ul>
            <br/>

            <h2>Running the Input Device Listener</h2>
            <p>To run the input device listener, you can create an instance of the <code>InputDeviceListener</code> class directly. However, this is only recommended for testing purposes. For any other use case, the input device listener should be executed together with the entire backend. Therefore, the <code>../main.py</code> script of the parent directory (<code>src</code>) should be executed. By doing so, it is ensured that the received inputs are actually sent to the RC car.</p>
            <p>For testing purposes, you can create an instance like this:</p>
            <br/>

            <pre style={{marginLeft: '40px'}}>
                <code>
                    {`inputDeviceListener = InputDeviceListener(<device_index>)
inputDeviceListener.run()`}
                </code>
            </pre>
            <br/>

            <p>The constructor of <code>InputDeviceListener</code> optionally takes an Integer value called <code>device_index</code> as input.
                This value has to be used if more than one device is connected. To select which device should be initialized, the provided <code>device_index</code> is used. If only one device is connected, this parameter may be left out as its default value is 1.</p>
            <br/>

            <h2>Purpose</h2>
            <p>The <code>InputDevice</code> class is configured to capture all relevant events, such as key presses, joystick movements or steering.
                It preprocesses these control inputs, mapping them to either steering angles or percentages for acceleration and braking.
                Data retrieval from the connected input device is implemented through the Python library <code>pygame</code>, which serves as a simple API to connect with arbitrary input devices.</p>
            <p>The separate <code>InputDeviceListener</code> class is designed to asynchronously poll the input data.
                By using this dedicated listener class, input events can be registered without blocking the communication between frontend, backend, and the RC car.</p>

            <div style={floatRight}>
                <button
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={() => setActiveTab('backend')}
                >
                    previous
                </button>
                <button
                    style={buttonStyle}
                    onMouseEnter={e => e.target.style.backgroundColor = hoverStyle.backgroundColor}
                    onMouseLeave={e => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    onClick={() => setActiveTab('demo')}
                >
                    next
                </button>
            </div>
        </div>
    );
}

export default Input;

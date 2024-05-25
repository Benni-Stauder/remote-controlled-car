import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import rc_car_pov_picture from './../media/pov_rc_car.webp';
import controls_picture from './../media/controls.webp';

function Home() {
    const headingRef = useRef(null);

    const [expandInnovation, setExpandInnovation] = useState(false);
    const [expandControl, setExpandControl] = useState(false);
    const [expandAccessibility, setExpandAccessibility] = useState(false);

    useEffect(() => {
        gsap.from(headingRef.current, { duration: 1, autoAlpha: 0, ease: 'power1.out', y: 30 });
    }, []);

    return (
        <div className="container">
            <h1>Welcome to the RC Car Project!</h1>
            <p>This is where you'll find information about our innovative RC car designs.</p>
            <p>Discover the forefront of remote control vehicle technology.</p>

            <div className="expandable-section">
                <h2 onClick={() => setExpandInnovation(!expandInnovation)}>Innovative Camera Integration</h2>
                {expandInnovation && (
                    <div>
                        <p>This project revolutionizes how cameras are integrated into remote control vehicles, allowing
                            for
                            unprecedented video quality and control precision.</p>
                        <img src={rc_car_pov_picture} alt="POV RC Car"/>
                    </div>
                )}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandControl(!expandControl)}>Advanced Control Systems</h2>
                {expandControl && (
                    <div>
                        <p>Our RC cars are equipped with state-of-the-art control systems that can be operated from
                            various
                            devices, including controllers and simulation rigs.</p>
                        <img src={controls_picture} alt="RC Car Controls"/>
                    </div>
                )}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandAccessibility(!expandAccessibility)}>Accessibility and
                    User-Friendliness</h2>
                {expandAccessibility &&
                    <p>We ensure that our technology is accessible to enthusiasts of all skill levels, providing
                        easy-to-use interfaces and comprehensive support.</p>}
            </div>
        </div>
    );
}

export default Home;

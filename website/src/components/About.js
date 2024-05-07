import React, { useState } from 'react';
import placeholderImage from './../media/placeholder.webp'; // Add the path to your placeholder image

function About() {
    const [expandTeam, setExpandTeam] = useState(false);
    const [expandMission, setExpandMission] = useState(false);
    const [expandLead, setExpandLead] = useState(true);
    const [expandScrum, setExpandScrum] = useState(true);
    const [expandFrontend, setExpandFrontend] = useState(true);
    const [expandBackend, setExpandBackend] = useState(true);
    const [expandTechLead, setExpandTechLead] = useState(true);

    return (
        <div className="container">
            <h1>About Us</h1>

            <div className="expandable-section">
                <h2 onClick={() => setExpandMission(!expandMission)}>Our Mission</h2>
                {expandMission && <p>Our mission is to innovate and elevate the remote-controlled vehicle experience through cutting-edge technology and user-friendly designs.</p>}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandTeam(!expandTeam)}>Meet Our Team</h2>
                {expandTeam && (
                    <div>
                        <h3 onClick={() => setExpandLead(!expandLead)}>Project Lead</h3>
                        {expandLead && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Project Lead" className="team-photo" />
                                <p>Our Project Lead oversees all project aspects, ensuring that strategic objectives are met while maintaining high standards of quality and performance.</p>
                            </div>
                        )}

                        <h3 onClick={() => setExpandTechLead(!expandTechLead)}>Technical Project Lead</h3>
                        {expandTechLead && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Technical Project Lead" className="team-photo" />
                                <p>Our technical Project Lead coordinates all development</p>
                            </div>
                        )}

                        <h3 onClick={() => setExpandScrum(!expandScrum)}>Scrum Master</h3>
                        {expandScrum && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Scrum Master" className="team-photo" />
                                <p>The Scrum Master facilitates all scrum ceremonies and ensures that the team operates smoothly, removing any obstacles that might hinder progress.</p>
                            </div>
                        )}

                        <h3 onClick={() => setExpandFrontend(!expandFrontend)}>Frontend Developer</h3>
                        {expandFrontend && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Frontend Developer" className="team-photo" />
                                <p>Specializing in user interface design and experience, our Frontend Developer crafts accessible and aesthetically pleasing applications.</p>
                            </div>
                        )}

                        <h3 onClick={() => setExpandBackend(!expandBackend)}>Backend Developers</h3>
                        {expandBackend && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Backend Developers" className="team-photo" />
                                <p>Our Backend Developers focus on server-side logic, database management, and integration, ensuring robust and scalable solutions.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default About;

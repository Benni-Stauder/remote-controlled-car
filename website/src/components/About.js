import React, { useState } from 'react';
import { useLanguage } from '../language_context';
import placeholderImage from './../media/placeholder.webp'; // Add the path to your placeholder image

function About() {
    const { language } = useLanguage(); // Access language state from context

    const [expandTeam, setExpandTeam] = useState(false);
    const [expandMission, setExpandMission] = useState(false);
    const [expandLead, setExpandLead] = useState(true);
    const [expandScrum, setExpandScrum] = useState(true);
    const [expandFrontend, setExpandFrontend] = useState(true);
    const [expandBackend, setExpandBackend] = useState(true);
    const [expandTechLead, setExpandTechLead] = useState(true);

    // Define translations for content
    const content = {
        en: {
            title: "About Us",
            mission: "Our Mission",
            missionText: "Our mission is to innovate and elevate the remote-controlled vehicle experience through cutting-edge technology and user-friendly designs.",
            team: "Meet Our Team",
            projectLead: "Project Lead",
            projectLeadText: "Our Project Lead oversees all project aspects, ensuring that strategic objectives are met while maintaining high standards of quality and performance.",
            techLead: "Technical Project Lead",
            techLeadText: "Our Technical Project Lead coordinates all development efforts to ensure technical excellence and timely delivery of our products.",
            scrumMaster: "Scrum Master",
            scrumMasterText: "The Scrum Master facilitates all scrum ceremonies and ensures that the team operates smoothly, removing any obstacles that might hinder progress.",
            frontendDeveloper: "Frontend Developer",
            frontendDeveloperText: "Specializing in user interface design and experience, our Frontend Developer crafts accessible and aesthetically pleasing applications.",
            backendDevelopers: "Backend Developers",
            backendDevelopersText: "Our Backend Developers focus on server-side logic, database management, and integration, ensuring robust and scalable solutions."
        },
        de: {
            title: "Über Uns",
            mission: "Unsere Mission",
            missionText: "Unsere Mission ist es, das Erlebnis mit ferngesteuerten Fahrzeugen durch modernste Technologie und benutzerfreundliches Design zu innovieren und zu verbessern.",
            team: "Unser Team",
            projectLead: "Projektleiter",
            projectLeadText: "Unser Projektleiter überwacht alle Aspekte des Projekts und stellt sicher, dass strategische Ziele erreicht werden und dabei hohe Qualitäts- und Leistungsstandards eingehalten werden.",
            techLead: "Technischer Projektleiter",
            techLeadText: "Unser technischer Projektleiter koordiniert alle Entwicklungsbemühungen, um technische Exzellenz und pünktliche Lieferung unserer Produkte sicherzustellen.",
            scrumMaster: "Scrum Master",
            scrumMasterText: "Der Scrum Master organisiert alle Scrum-Zeremonien und sorgt dafür, dass das Team reibungslos funktioniert und Hindernisse beseitigt werden, die den Fortschritt behindern könnten.",
            frontendDeveloper: "Frontend-Entwickler",
            frontendDeveloperText: "Unser Frontend-Entwickler ist spezialisiert auf Benutzeroberflächendesign und -erfahrung und gestaltet zugängliche und ästhetisch ansprechende Anwendungen.",
            backendDevelopers: "Backend-Entwickler",
            backendDevelopersText: "Unsere Backend-Entwickler konzentrieren sich auf serverseitige Logik, Datenbankverwaltung und Integration, um robuste und skalierbare Lösungen sicherzustellen."
        }
    };

    return (
        <div className="container">
            <h1>{content[language].title}</h1>

            <div className="expandable-section">
                <h2 onClick={() => setExpandMission(!expandMission)}>{content[language].mission}</h2>
                {expandMission && <p>{content[language].missionText}</p>}
            </div>

            <div className="expandable-section">
                <h2 onClick={() => setExpandTeam(!expandTeam)}>{content[language].team}</h2>
                {expandTeam && (
                    <div>
                        <h3 onClick={() => setExpandLead(!expandLead)}>{content[language].projectLead}</h3>
                        {expandLead && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Project Lead" className="team-photo" />
                                <p>{content[language].projectLeadText}</p>
                            </div>
                        )}

                        <h3 onClick={() => setExpandTechLead(!expandTechLead)}>{content[language].techLead}</h3>
                        {expandTechLead && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Technical Project Lead" className="team-photo" />
                                <p>{content[language].techLeadText}</p>
                            </div>
                        )}

                        <h3 onClick={() => setExpandScrum(!expandScrum)}>{content[language].scrumMaster}</h3>
                        {expandScrum && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Scrum Master" className="team-photo" />
                                <p>{content[language].scrumMasterText}</p>
                            </div>
                        )}

                        <h3 onClick={() => setExpandFrontend(!expandFrontend)}>{content[language].frontendDeveloper}</h3>
                        {expandFrontend && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Frontend Developer" className="team-photo" />
                                <p>{content[language].frontendDeveloperText}</p>
                            </div>
                        )}

                        <h3 onClick={() => setExpandBackend(!expandBackend)}>{content[language].backendDevelopers}</h3>
                        {expandBackend && (
                            <div className="team-member">
                                <img src={placeholderImage} alt="Backend Developers" className="team-photo" />
                                <p>{content[language].backendDevelopersText}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default About;

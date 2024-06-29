import {useLanguage} from "../../language_context";

const content = {
    en: {
        title: "Frontend",
        sections: [
            {
                id: "installation",
                title: "Installation",
                steps: [
                    {
                        number: 1,
                        text: "Clone repository (if not already done):",
                        code: "git clone https://github.com/username/repo-name.git\ncd app"
                    },
                    {
                        number: 2,
                        text: "Install",
                        html: <a href='https://nodejs.org/en' target='_blank' rel='noopener noreferrer'>Node.js</a>
                    },
                    {
                        number: 3,
                        text: "Install Rust (if not already installed): Follow the instructions on: (On Windows, a C++ compiler is needed, selectable in the VS installation)",
                        html: <a href='https://www.rust-lang.org/' target='_blank'
                                 rel='noopener noreferrer'>rust-lang.org</a>
                    },
                    {
                        number: 4,
                        text: "Install pnpm:",
                        code: "npm i -g pnpm"
                    },
                    {
                        number: 5,
                        text: "Install dependencies:",
                        code: "pnpm i"
                    },
                    {
                        number: 6,
                        text: "Build Tauri app:",
                        code: "pnpm tauri build\nThis command builds the app without starting it."
                    },
                    {
                        number: 7,
                        text: "Start Tauri app:",
                        code: "pnpm tauri dev"
                    }
                ]
            }
        ]
    },
    de: {
        title: "Frontend",
        sections: [
            {
                id: "installation",
                title: "Installation",
                steps: [
                    {
                        number: 1,
                        text: "Repository klonen (falls noch nicht geschehen):",
                        code: "git clone https://github.com/benutzername/repo-name.git\ncd app"
                    },
                    {
                        number: 2,
                        text: " Installiere:",
                        html: <a href='https://nodejs.org/en' target='_blank' rel='noopener noreferrer'>Node.js</a>
                    },
                    {
                        number: 3,
                        text: "Rust installieren (falls noch nicht installiert): Folgen Sie den Anweisungen auf: (Bei Windows wird ein C++ Compiler benötigt, auswählbar in der VS Installation)",
                        html: <a href='https://www.rust-lang.org/' target='_blank' rel='noopener noreferrer'>rust-lang.org</a>
            },
            {
                number: 4,
                text: "pnpm installieren:",
                        code: "npm i -g pnpm"
                    },
                    {
                        number: 5,
                        text: "Abhängigkeiten installieren:",
                        code: "pnpm i"
                    },
                    {
                        number: 6,
                        text: "Tauri-App bauen:",
                        code: "pnpm tauri build\nHier wird die App lediglich gebaut (gebuilded), nicht gestartet."
                    },
                    {
                        number: 7,
                        text: "Tauri-App starten:",
                        code: "pnpm tauri dev"
                    }
                ]
            }
        ]
    }
};

const FrontendInstallation = () => {
    const { language } = useLanguage()

    const { title, sections } = content[language];

    return (
        <div>
            <h1>{title}</h1>

            {sections.map(section => (
                <section key={section.id} id={section.id}>
                    <h2>{section.title}</h2>
                    <ol>
                        {section.steps.map(step => (
                            <li key={step.number}>
                                {step.text}
                                {step.code && (
                                    <pre><code>{step.code}</code></pre>
                                )}
                                {step.html && (
                                    <div>{step.html}</div>
                                )}
                            </li>
                        ))}
                    </ol>
                </section>
            ))}
        </div>
    );
};

export default FrontendInstallation;
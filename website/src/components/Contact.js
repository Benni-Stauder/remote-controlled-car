import React, { useState } from 'react';
import { useLanguage } from '../language_context';

function Contact() {
    const { language } = useLanguage(); // Access language state from context
    const [showForm, setShowForm] = useState(false);

    // Define translations for content
    const content = {
        en: {
            title: "Contact Us",
            intro: "If you have any questions, feedback, or would like to get in touch, please fill out the form below and we will respond as soon as possible.",
            button: "Click Here to Contact Us",
            nameLabel: "Name:",
            namePlaceholder: "Enter your name",
            emailLabel: "Email:",
            emailPlaceholder: "Enter your email",
            messageLabel: "Message:",
            messagePlaceholder: "Your message",
            submitButton: "Submit"
        },
        de: {
            title: "Kontaktieren Sie uns",
            intro: "Wenn Sie Fragen, Feedback oder Anregungen haben oder mit uns in Kontakt treten möchten, füllen Sie bitte das unten stehende Formular aus. Wir werden uns so schnell wie möglich bei Ihnen melden.",
            button: "Klicken Sie hier, um uns zu kontaktieren",
            nameLabel: "Name:",
            namePlaceholder: "Geben Sie Ihren Namen ein",
            emailLabel: "E-Mail:",
            emailPlaceholder: "Geben Sie Ihre E-Mail-Adresse ein",
            messageLabel: "Nachricht:",
            messagePlaceholder: "Ihre Nachricht",
            submitButton: "Absenden"
        }
    };

    return (
        <div className="container">
            <h1>{content[language].title}</h1>
            <p>{content[language].intro}</p>
            <div className="expandable-section">
                <h2 onClick={() => setShowForm(!showForm)}>{content[language].button}</h2>
                {showForm && (
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">{content[language].nameLabel}</label>
                            <input type="text" id="name" name="name" placeholder={content[language].namePlaceholder} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{content[language].emailLabel}</label>
                            <input type="email" id="email" name="email" placeholder={content[language].emailPlaceholder} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">{content[language].messageLabel}</label>
                            <textarea id="message" name="message" placeholder={content[language].messagePlaceholder} required rows="4"></textarea>
                        </div>
                        <button type="submit" className="submit-button">{content[language].submitButton}</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Contact;

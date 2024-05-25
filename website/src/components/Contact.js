import React, { useState } from 'react';

function Contact() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="container">
            <h1>Contact Us</h1>
            <p>If you have any questions, feedback, or would like to get in touch, please fill out the form below and we will respond as soon as possible.</p>
            <div className="expandable-section">
                <h2 onClick={() => setShowForm(!showForm)}>Click Here to Contact Us</h2>
                {showForm && (
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" placeholder="Your message" required rows="4"></textarea>
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Contact;

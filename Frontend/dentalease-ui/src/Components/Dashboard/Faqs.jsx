import React from "react";

import './dashboard.css';
import './utils.css';

const Faqs = () => {

    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Frequently Asked Questions</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Frequently Asked Questions</li>
                        </ol>
                    </nav>
                </div>
                <section className="section faq">
                    <div className="row prof-section">
                        <div className="col-xl-2  nighty-five">
                            <div className="card">
                                <div className="card-body" >
                                    <div>
                                        <h6>1. How do I register an account on the platform?</h6>
                                        <p>To register an account, click on the "Register" button on the homepage and fill out the required information in the registration form. Once completed, submit the form, and you will receive a confirmation email to verify your account.</p>

                                        <h6>2. How can I schedule appointments through the platform?</h6>
                                        <p>Yes, you can schedule appointments through the platform's appointment scheduling feature. Simply navigate to the "Appointments History" section in your profile, select the desired date and time.</p>

                                        <h6>3. How can I access my appointment history?</h6>
                                        <p>You can access your history by logging into your profile and Simply navigate to the "Appointments History".</p>

                                        <h6>4. What payment methods are accepted for booking appointments?</h6>
                                        <p>The platform accepts various payment methods for booking appointments, including cash, and UPI. You can choose your preferred payment method during the appointment completion process.</p>

                                        <h6>5. Is my personal information secure on the platform?</h6>
                                        <p>Yes, the platform prioritizes data security and employs robust encryption methods to protect your personal information. Additionally, the platform adheres to strict privacy policies and regulations to ensure the confidentiality and security of user data.</p>

                                        <h6>6. How do I update my profile information?</h6>
                                        <p>You can update your profile information by logging into your account and navigating to the "Profile" section. From there, you can edit your personal details, contact information, and preferences as needed and save the changes.</p>

                                        <h6>7. Can I cancel appointments?</h6>
                                        <p>Yes, you can cancel appointments through the platform's appointment management feature. Simply navigate to the "Appointments History" section in your profile, select the appointment you wish to cancel, and follow the prompts to make the necessary changes.</p>

                                        <h6>8. How can I download invoice?</h6>
                                        <p>Once your appointment is completed. You can simply got to "Appointment History" tab and download the invoice.</p>

                                        <h6>9. Are there any mobile apps available for accessing the platform?</h6>
                                        <p>Not currently, In future we will make mobile apps available for both Android and iOS devices, allowing users to access the platform conveniently from their smartphones or tablets. You can download the app from the respective app stores and log in using your account credentials.</p>

                                        <h6>10. How can I contact customer support for assistance?</h6>
                                        <p>If you need assistance or have any questions, you can contact customer support by clicking on the "Contact Us" link located on the platform's homepage. Alternatively, you can send an email to dentaleaseclinic@gmail.com.</p>

                                        <h6>11. What should I do if I encounter technical issues or errors while using the platform?</h6>
                                        <p>If you encounter technical issues or errors while using the platform, try refreshing the page or clearing your browser cache. If the issue persists, contact customer support for assistance, providing details about the error message or problem you're experiencing. Our technical team will work to resolve the issue promptly.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Faqs;

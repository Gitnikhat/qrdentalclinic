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

                                        <h6>2. Can I schedule appointments with healthcare providers through the platform?</h6>
                                        <p>Yes, you can schedule appointments with healthcare providers through the platform's appointment scheduling feature. Simply navigate to the "Appointments" section in your profile, select the desired date and time, and choose your preferred healthcare provider.</p>

                                        <h6>3. How can I access my medical history and health records?</h6>
                                        <p>You can access your medical history and health records by logging into your profile and navigating to the "Medical Records" section. There, you will find a comprehensive list of your health records, including past diagnoses, treatments, and test results.</p>

                                        <h6>4. What payment methods are accepted for booking appointments?</h6>
                                        <p>The platform accepts various payment methods for booking appointments, including credit/debit cards, mobile wallets, and direct bank transfers. You can choose your preferred payment method during the appointment booking process.</p>

                                        <h6>5. Is my personal information secure on the platform?</h6>
                                        <p>Yes, the platform prioritizes data security and employs robust encryption methods to protect your personal information. Additionally, the platform adheres to strict privacy policies and regulations to ensure the confidentiality and security of user data.</p>

                                        <h6>6. How do I update my profile information?</h6>
                                        <p>You can update your profile information by logging into your account and navigating to the "Profile" or "Settings" section. From there, you can edit your personal details, contact information, and preferences as needed and save the changes.</p>

                                        <h6>7. Can I cancel or reschedule appointments?</h6>
                                        <p>Yes, you can cancel or reschedule appointments through the platform's appointment management feature. Simply navigate to the "Appointments" section in your profile, select the appointment you wish to cancel or reschedule, and follow the prompts to make the necessary changes.</p>

                                        <h6>8. Are there any mobile apps available for accessing the platform?</h6>
                                        <p>Yes, there are mobile apps available for both Android and iOS devices, allowing users to access the platform conveniently from their smartphones or tablets. You can download the app from the respective app stores and log in using your account credentials.</p>

                                        <h6>9. How can I contact customer support for assistance?</h6>
                                        <p>If you need assistance or have any questions, you can contact customer support by clicking on the "Support" or "Contact Us" link located on the platform's homepage. Alternatively, you can send an email to support@platform.com or call our toll-free helpline at 1-800-123-4567.</p>

                                        <h6>10. What should I do if I encounter technical issues or errors while using the platform?</h6>
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

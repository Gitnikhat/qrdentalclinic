import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaUser, FaPhoneAlt, FaLock} from "react-icons/fa";
import { MdMail } from "react-icons/md";

import './authentication.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        registered: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register', formData);
            console.log('Response:', response.data, "status: ", response.status);
            if (response.status === 200) {
                console.log("200")
                navigate("/login");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id="authentication-page">
            <div className="auth-wrapper  auth-box">
                <form onSubmit={handleSubmit} method="post">
                    <h1>Register</h1>
                    <p className="tagline">Unlock a World of Dental Care Excellence with Dentalease – Your Trusted Partner in Dental Health and Wellness.</p>
                    <div className="input-box">
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Full name" required/>
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" required/>
                        <MdMail className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="10 digit phone number" required/>
                        <FaPhoneAlt className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Password" required/>
                        <FaLock className="icon" />
                    </div>

                    <button className="btn btn-custom btn-lg" type="submit">Register</button>  

                    <div className="go-back">
                        Already have an account? <a href="/login"> Login</a>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register;
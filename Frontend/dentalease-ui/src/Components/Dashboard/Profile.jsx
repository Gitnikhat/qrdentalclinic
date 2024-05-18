import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaPhone, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useUser } from "../Usercontext";

import './dashboard.css';
import './utils.css';

const Profile = () => {
    const navigate = useNavigate();
    const { userData } = useUser();
    const { user_id} = userData;
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        gender: '',
        age: '',
        address: '',
        profile_qr: ''
    });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        // Fetch profile data from the API
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/profile?id=${user_id}`);
                console.log("response profile:", response.data)
                const { data } = response;
                setFormData(data.data); // Accessing the nested data object
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/editprofile', formData);
            console.log('Response:', response.data, "status: ", response.status);
            if (response.status == 200) {
                console.log("Profile updated successfully");
                setEditing(false);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row prof-section">
                        <div className="col-xl-2">
                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center card-body-no-padding">
                                    <img src={`http://localhost:8000${formData.profile_qr}`} alt="QR Code" className="qr-image img-one-eighty" />
                                    <h3>{formData.name}</h3>
                                    <h5>{formData.email}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="card prof-form-div">
                                <form onSubmit={handleSubmit} method="post">
                                    <div className="dash-input-box">
                                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required disabled={!editing} />
                                        <FaUser className="icon" />
                                    </div>
                                    <div className="dash-input-box">
                                        <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required disabled={!editing} />
                                        <FaPhone className="icon" />
                                    </div>
                                    <div className="dash-input-box">
                                        <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="User Email / Username" required disabled={!editing} />
                                        <MdMail className="icon" />
                                    </div>
                                    <div className="dash-input-box">
                                        <select name="gender" id="gender" value={formData.gender} onChange={handleChange} disabled={!editing}>
                                            <option value="">Select gender</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                        </select>
                                        <FaLock className="icon" />
                                    </div>
                                    <div className="dash-input-box">
                                        <input type="text" name="age" id="age" value={formData.age || ''} onChange={handleChange} placeholder="Age" disabled={!editing} />
                                        <FaUser className="icon" />
                                    </div>
                                    <div className="dash-input-box">
                                        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} placeholder="Address" required disabled={!editing} />
                                        <FaUser className="icon" />
                                    </div>
                                    {editing ?
                                        <button className="btn btn-custom btn-lg" type="submit">Save</button>
                                        :
                                        <button className="btn btn-custom btn-lg" type="button" onClick={() => setEditing(true)}>Edit</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Profile;

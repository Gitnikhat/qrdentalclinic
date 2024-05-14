import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import { FaLock, FaPhone, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";

import './dashboard.css';
import './utils.css';

const Appointments = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        treatment: '',
        patient: '',
        patient_remark: '',
        doctor_remark: '',
        time_slot_date: new Date(),
        user_type: '',
        treatments: [],
        patients: [],
    });

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const treatmentsResponse = await axios.get("http://localhost:8000/treatment");
                const patientsResponse = await axios.get('http://localhost:8000/patient');
                setFormData(prevState => ({
                    ...prevState,
                    treatments: treatmentsResponse.data,
                    patients: patientsResponse.data
                }));
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, time_slot_date: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/appointment', formData);
            if (response.status === 201) {
                navigate("/manage-appointments");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Book Appointment</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={handleSubmit} method="post">
                                <h1>Book Appointment</h1>

                                <div className="dash-input-box">
                                    <Select
                                        options={formData.treatments.map(treatment => ({
                                            value: treatment.id,
                                            label: treatment.title
                                        }))}
                                        onChange={(selectedOption) => setFormData({ ...formData, treatment: selectedOption })}
                                        placeholder="Select Treatment"
                                    />
                                    <FaUser className="icon" />
                                </div>
                                <div className="dash-input-box">
                                    <Select
                                        options={formData.patients.map(patient => ({
                                            value: patient.id,
                                            label: patient.name
                                        }))}
                                        onChange={(selectedOption) => setFormData({ ...formData, patient: selectedOption })}
                                        placeholder="Select Patient"
                                    />
                                    <FaPhone className="icon" />
                                </div>
                                <div className="dash-input-box">
                                    <input type="text" name="patient_remark" id="patient_remark" value={formData.patient_remark} onChange={handleChange} placeholder="Patient Remark" />
                                    <MdMail className="icon" />
                                </div>
                                <div className="dash-input-box">
                                    <input type="text" name="doctor_remark" id="doctor_remark" value={formData.doctor_remark} onChange={handleChange} placeholder="Doctor Remark" />
                                    <MdMail className="icon" />
                                </div>
                                <div className="dash-input-box">
                                    <DatePicker
                                        selected={formData.time_slot_date}
                                        onChange={handleDateChange}
                                        minDate={new Date()} // Disable past dates
                                    />
                                </div>
                                <div className="dash-input-box">
                                    <input type="text" name="user_type" id="user_type" value={formData.user_type} onChange={handleChange} placeholder="User Type" />
                                    <FaLock className="icon" />
                                </div>

                                <button className="btn btn-custom btn-lg" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Appointments;

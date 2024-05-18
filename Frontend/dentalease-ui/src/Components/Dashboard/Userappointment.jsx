import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaDownload } from 'react-icons/fa'; 


import './dashboard.css';
import './utils.css';

const Userappointment = (props) => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formData, setFormData] = useState({
        treatment: '',
        patient: '',
        timeslot: selectedDate,
        patient_remark: '',
        doctor_remark: '',
        appointment_qr: null,
        status: ''
    });
    const [holidays, setHolidays] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchAppointments();
        fetchTreatments();
        fetchPatients();
        fetchHolidays(selectedDate);
    }, [selectedDate]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/appointments');
            if (response.status === 200) {
                setAppointments(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchTreatments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/treatment');
            if (response.status === 200) {
                setTreatments(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching treatments:', error);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:8000/patient');
            if (response.status === 200) {
                setPatients(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const fetchHolidays = async (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        try {
            const response = await axios.get(`http://localhost:8000/timeslot?year=${year}&month=${month}`);
            if (response.status === 200) {
                const holidayDates = response.data.data
                    .filter(item => item.show_date)
                    .map(item => new Date(item.date));
                setHolidays(holidayDates);
            }
        } catch (error) {
            console.error('Error fetching holidays:', error);
        }
    };

    const handleDelete = async (url) => {
        try {
            const response = await axios.post(url);
            if (response.status === 200) {
                fetchAppointments(); // Reload appointments after deletion
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormData({ ...formData, timeslot: date });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/appointments', formData);
            if (response.status === 200) {
                fetchAppointments(); // Reload appointments after adding new appointment
                setShowForm(false); // Hide the form after submission
            }
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };

    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Appointments </h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Manage Appointments</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            

                            {showForm ? (
                                <form onSubmit={handleSubmit} method="post">
                                    <div className="dash-input-box">
                                        <select name="treatment" value={formData.treatment} onChange={handleChange} required>
                                            <option value="">Select Treatment</option>
                                            {treatments.map(treatment => (
                                                <option key={treatment.id} value={treatment.id}>{treatment.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="calendar-container cal-custom">
                                        <div className="calendar">
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                includeDates={holidays}
                                                excludeDates={holidays.length ? null : [new Date()]} // Disable today if no holidays
                                            />
                                        </div>
                                    </div>
                                    <div className="dash-input-box">
                                        <input type="text" name="patient_remark" value={formData.patient_remark} onChange={handleChange} placeholder="Patient Remark" />
                                    </div>
                                    <button className="btn btn-custom btn-lg" type="submit">Submit</button>
                                </form>
                            ) : (
                                <div className="card">
                                    <div className="card-body">
                                        <div className="add-btn-holder">
                                            <button onClick={() => setShowForm(true)} className="btn btn-custom btn-lg page-scroll small-font">Book Appointment</button>
                                        </div>
                                        <div className="scroll-div">
                                            <table className="table datatable">
                                                <thead>
                                                    <tr>
                                                        <th>Treatment</th>
                                                        <th>Patient</th>
                                                        <th>Timeslot</th>
                                                        <th>Patient Remark</th>
                                                        <th>Doctor Remark</th>
                                                        <th>Status</th>
                                                        <th>Invoice</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(appointments) && appointments.map((appointment) => (
                                                        <tr key={appointment.id}>
                                                            <td>{appointment.treatment}</td>
                                                            <td>{appointment.patient_name}</td>
                                                            <td>{appointment.slot}</td>
                                                            <td>{appointment.patient_remark}</td>
                                                            <td>{appointment.doctor_remark}</td>
                                                            <td>{appointment.status}</td>
                                                            <td className="center-align-no-padding">
                                                                {appointment.invoice_url && (
                                                                    <a href={appointment.invoice_url} download>
                                                                        <FaDownload />
                                                                    </a>
                                                                )}
                                                            </td>
                                                            <td>
                                                                {appointment.status !== "Cancelled" && appointment.status !== "Completed" && (
                                                                    <button onClick={() => handleDelete(appointment.cancel_url)} className="cancel-btn">
                                                                        Cancel
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                       
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Userappointment;

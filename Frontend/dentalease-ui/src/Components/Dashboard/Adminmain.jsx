import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaUsers, FaClipboardList } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './dashboard.css';
import './utils.css';

const Adminmain = (props) => {
    const [totalAppointments, setTotalAppointments] = useState({
        total: 0,
        completed: 0,
        cancelled: 0,
        pending: 0,
    });
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalPatients, setTotalPatients] = useState({
        total:0
    });

    useEffect(() => {
        fetchTotalAppointments();
        fetchTotalPatients();
    }, []);

    useEffect(() => {
        fetchUpcomingAppointments(selectedDate);
    }, [selectedDate]);

    const fetchTotalAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/total-appointments');
            setTotalAppointments(response.data.data);
        } catch (error) {
            console.error('Error fetching total appointments:', error);
        }
    };

    const fetchUpcomingAppointments = async (date) => {
        try {
            const response = await axios.get(`http://localhost:8000/upcoming-appointments?date=${date.toISOString().split('T')[0]}`);
            setUpcomingAppointments(response.data.data);
        } catch (error) {
            console.error('Error fetching upcoming appointments:', error);
        }
    };

    const fetchTotalPatients = async () => {
        try {
            const response = await axios.get('http://localhost:8000/total-patients-count');
            setTotalPatients(response.data.data);
        } catch (error) {
            console.error('Error fetching total patients:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Dashboard</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </nav>
                </div>

                <section className="section">
                    <div className="row">
                        {/* Total Appointments Card */}
                        <div className="col-lg-6">
                            <div className="card fixed-height-card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Appointments</h5>
                                    <div className="d-flex align-items-center">
                                        <FaClipboardList size={48} />
                                        <div className="ps-3">
                                            <h6 className="total-s">Total: {totalAppointments.total}</h6>
                                            <span className="completed-s">Completed: {totalAppointments.completed}</span><br />
                                            <span className="canceled-s">Cancelled: {totalAppointments.cancelled}</span><br />
                                            <span className="pending-s">Pending: {totalAppointments.pending}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Patients Card */}
                        <div className="col-lg-6">
                            <div className="card fixed-height-card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Patients</h5>
                                    <div className="d-flex align-items-center">
                                        <FaUsers size={48} />
                                        <div className="ps-3">
                                            <h6 className="total-c">{totalPatients.total}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         
                    </div>
                    <div className="row">
                        {/* Upcoming Appointments Card */}
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Upcoming Appointments</h5>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button className="calendar-arrow" onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>&lt;</button>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control blank-style"
                                        />
                                        <button className="calendar-arrow" onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>&gt;</button>
                                    </div>
                                    <div className="scroll-div">
                                        <table className="table datatable">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Patient Name</th>
                                                    <th>Treatment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {upcomingAppointments.length > 0 ? (
                                                    upcomingAppointments.map((appointment, index) => (
                                                        <tr key={index}>
                                                            <td>{appointment.date}</td>
                                                            <td>{appointment.patient_name}</td>
                                                            <td>{appointment.treatment}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3">No appointments found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Adminmain;
